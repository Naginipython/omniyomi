use std::{fs::File, io::Write, sync::Mutex};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use tauri::{api::http::{ClientBuilder, HttpRequestBuilder, ResponseType}, http::header::USER_AGENT};
use lazy_static::lazy_static;

use crate::{ChapterItem, LibraryItem};

lazy_static! {
    static ref PLUGINS: Mutex<Vec<Plugins>> = match File::open("plugins.json") {
      Ok(file) => Mutex::new(serde_json::from_reader(file).unwrap_or_default()),
      Err(e) => {
        eprintln!("ERROR: {e}");
        let plugins = init_plugins();
        Mutex::new(plugins)
      }
    };
}

fn save(lib: &Vec<Plugins>) {
    let mut file = File::create("plugins.json").unwrap();
    let json = serde_json::to_string(&*lib).unwrap();
    file.write_all(json.as_bytes()).unwrap();
}
fn get_plugins() -> Vec<Plugins> {
    match File::open("plugins.json") {
        Ok(file) => serde_json::from_reader(file).unwrap_or_default(),
        Err(_e) => init_plugins()
    }
}
fn init_plugins() -> Vec<Plugins> {
    let plugins = vec![Plugins {
      id: String::from("MangaDex"),
      search_url: String::from("https://api.mangadex.org/manga?limit=100&includes[]=cover_art&includes[]=author&includes[]=artist&title={title}"),
      search: String::from("
        function search(json) {
          let data = [];
          for (let d of json['data']) {
            let temp = {};
            temp['id'] = d['id'];
            temp['title'] = d['attributes']['title']['en'];
            let filetemp = d['relationships'].filter(o => o.type == 'cover_art')[0];
            temp['img'] = `https://uploads.mangadex.org/covers/${temp['id']}/${filetemp['attributes']['fileName']}`;
            temp['extension'] = 'MangaDex';
            temp['description'] = d['attributes']['description']['en'];
            temp['chapters'] = [];
            let author_names = d['relationships'].filter(x => x.type == 'author').map(y => y['attributes']['name']);
            let artist_names = d['relationships'].filter(x => x.type == 'artist').map(y => y['attributes']['name']);
            temp['authors'] = author_names.join(', ');
            temp['artists'] = artist_names.join(', ');
            data.push(temp);
          }
          return data;
        }
      "),
      chapters_url: String::from("https://api.mangadex.org/manga/{id}/feed?limit=500&order[chapter]=asc&translatedLanguage[]=en"),
      get_chapters: String::from("
        function getChapters(json) {
          return json['data'].map(e => {
            return {
                number: parseInt(e['attributes']['chapter']),
                id: e['id'],
                title: e['attributes']['title'] == '' || e['attributes']['title'] == null? `Chapter ${e['attributes']['chapter']}` : e['attributes']['title'],
                page: 1,
                completed: false
            }
          });
        }
      "),
      pages_url: String::from("https://api.mangadex.org/at-home/server/{id}"),
      get_pages: String::from("
        function getChapterPages(json) {
          let hash = json['chapter']['hash'];
          let data = json['chapter']['data'];
          return data.map(x => `https://uploads.mangadex.org/data/${hash}/${x}`);
        }
      "),
    }];
    save(&plugins);
    plugins
}

#[derive(Debug, Deserialize, Serialize, Default, Clone)]
struct Plugins {
  id: String,
  search_url: String,
  search: String,
  chapters_url: String,
  get_chapters: String,
  pages_url: String,
  get_pages: String
}

#[tauri::command]
pub fn get_plugin_names() -> Value {
  let plugins = PLUGINS.lock().unwrap();
  let temp: Vec<String> = plugins.iter().map(|p| p.id.clone()).collect();
  json!(temp)
}

fn replace_url(url: &String, placeholder: &str, replace: &str) -> String {
  url.replace(placeholder, replace)
}
async fn fetch(url: String) -> Value {
  // Fetching page data
  let user_agent = "Mozilla/5.0 (Linux; Android 13; SM-S901U) AppleWebkit/537.36 (KHTML, like Gecko Chrome/112.0.0.0 Mobile Safari/537.36";
  let client = ClientBuilder::new()
      .max_redirections(3)
      .build().unwrap();
  let request = HttpRequestBuilder::new("GET", url).unwrap()
      .header(USER_AGENT, user_agent).unwrap()
      .response_type(ResponseType::Text);

  // Sends the request and gets the data
  let res = client.send(request).await.unwrap();
  res.read().await.unwrap().data
}

#[tauri::command]
pub async fn search(query: String, sources: Vec<String>) -> Value {
  println!("Searching...");
  let mut result: Vec<LibraryItem> = Vec::new();
  let plugins = get_plugins();
  println!("{:?}", sources);
  for p in plugins {
    if sources.contains(&p.id) {
      // Fetching page data
      let url = replace_url(&p.search_url, "{title}", &query);
      let data = fetch(url).await;
  
      // Getting from plugins
      let mut search = (p.search).to_string();
      search.push_str(&format!("JSON.stringify(search(JSON.parse({})))", data));
    
      let mut scope = jstime_core::JSTime::new(jstime_core::Options::default());
      let output = scope.run_script(&search, "jstime").expect("");
      result = serde_json::from_str(&output).unwrap();
    }
  }
  json!(result)
}

#[tauri::command]
pub async fn get_chapters(source: String, id: String) -> Value {
  println!("Getting chapters...");
  let mut result: Vec<ChapterItem> = Vec::new();
  let plugins = get_plugins();
  let plugin = plugins.iter().find(|p| p.id == source);
  if let Some(p) = plugin {
    let url = replace_url(&p.chapters_url, "{id}", &id);
    let data = fetch(url).await;

    // Getting from plugins
    let mut chap_func = (p.get_chapters).to_string();
    chap_func.push_str(&format!("JSON.stringify(getChapters(JSON.parse({})))", data));

    let mut scope = jstime_core::JSTime::new(jstime_core::Options::default());
    let output = scope.run_script(&chap_func, "jstime").expect("JS Somehow failed");
    result = serde_json::from_str(&output).unwrap();
  }
  json!(result)
}

#[tauri::command]
pub async fn get_pages(source: String, id: String) -> Value {
  println!("Getting pages...");
  let mut result: Vec<String> = Vec::new();
  let plugins = get_plugins();
  let plugin = plugins.iter().find(|p| p.id == source);
  if let Some(p) = plugin {
    let url = replace_url(&p.pages_url, "{id}", &id);
    let data = fetch(url).await;

    // Getting from plugins
    let mut pages_func = (p.get_pages).to_string();
    pages_func.push_str(&format!("JSON.stringify(getChapterPages(JSON.parse({})))", data));

    let mut scope = jstime_core::JSTime::new(jstime_core::Options::default());
    let output = scope.run_script(&pages_func, "jstime").expect("JS Somehow failed");
    result = serde_json::from_str(&output).unwrap();
  }
  json!(result)
}
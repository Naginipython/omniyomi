// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs::File, io::Write, sync::Mutex};
use lazy_static::lazy_static;
// use scrape::*;
use serde::{Deserialize, Serialize};
use serde_json::Value;

// mod scrape;

lazy_static! {
  static ref LIB: Mutex<Vec<LibraryItem>> = match File::open("library.json") {
      Ok(file) => Mutex::new(serde_json::from_reader(file).unwrap_or_default()),
      Err(e) => {
        eprintln!("ERROR: {e}");
        Mutex::new(Vec::new())
      }
  };
}

fn main() {
  // geckodriver
  // let _driver = Command::new("geckodriver").spawn().map_err(|e| format!("Failed to start Geckodriver: {}", e)).expect("Error: Couldn't start Geckodriver");

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      get_lib, add_to_lib, remove_from_lib
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[derive(Debug, Deserialize, Serialize)]
struct LibraryItem {
  id: String,
  title: String,
  img: String,
  extention: String,
  authors: String,
  artists: String,
  description: String,
  chapters: Vec<ChapterItem>
}
#[derive(Debug, Deserialize, Serialize)]
struct ChapterItem {
  id: String,
  number: u32,
  title: String,
  page: u32,
}

#[tauri::command]
fn get_lib() -> Value {
  // todo: fix unwraps
  let lib = LIB.lock().unwrap();
  serde_json::to_value(&*lib).unwrap()
}

#[tauri::command]
fn add_to_lib(new_item: LibraryItem) {
  // todo: fix unwraps
  println!("Adding to library...");
  let mut file = File::create("library.json").unwrap();
  let mut lib = LIB.lock().unwrap();
  lib.push(new_item);
  let json = serde_json::to_string(&*lib).unwrap();
  file.write_all(json.as_bytes()).unwrap();
}

#[tauri::command]
fn remove_from_lib(id: String) {
  // todo: fix unwraps
  println!("Removing from library...");
  let mut file = File::create("library.json").unwrap();
  let mut lib = LIB.lock().unwrap();
  lib.retain(|l| l.id != id);
  let json = serde_json::to_string(&*lib).unwrap();
  file.write_all(json.as_bytes()).unwrap();
}
var fs = require('fs');

// This helps one create a JSON that can be inputted for a plugin.
let plugin = {}

// Name for your plugin
plugin.id = "";

// Media type of the plugin. Valid types are "manga", "anime", and "ln"
plugin.media_type = "";

// Url for your plugin. Note that '{title}' is needed to query
plugin.search_url = "{title}"; 

// JS code needed to search. Will need a param of the raw GET of the search_url, and return:
// LibraryItem:
// {
//     id: String,
//     title: String,
//     img: String,
//     plugin: String,
//     authors: String,
//     artists: String,
//     description: String OR none,
//     chapters: [ ChapterItem ]
// }
plugin.search = "function search(html) { let data = []; return data; }";

// A field that adds more functionality to the fetch requests. Current usable fields:
// request: String  - Used to change the fetch to "post"
plugin.search_extra = {}

// Get Chapters url. Note that '{id}' is the part of the link that is the specific item's url
plugin.chapters_url = "{id}";

// JS code needed to get chapter data. Will need a param of the raw GET of the chapters_url, and return:
// ChapterItem:
// [
//     {
//         id: String,
//         number: Float,
//         title: String,
//         page: Number,
//         completed: Boolean
//     }
// ]
plugin.get_chapters = "function getChapters(html) { let data = []; return data; }";

// A field that adds more functionality to the fetch requests. Current usable fields:
// request: String  - Used to change the fetch to "post"
plugin.chapters_extra = {}

// Get Pages url. Note that '{id}' is the part of the link that is the specific item's chapter url
plugin.pages_url = "{id}";

// JS code needed to get page links. Will need a param of the raw GET of the chapters_url, and return:
// [ String ]
plugin.get_pages = "function getChapterPages(html) { let data = []; return data; }";

// A field that adds more functionality to the fetch requests. Current usable fields:
// request: String  - Used to change the fetch to "post"
plugin.pages_extra = {}

// Removes /n, extra spaces, and '\' needed for js things
for (const [key, val] of Object.entries(plugin)) {
  if (typeof val == "string") {
    plugin[key] = val.replaceAll('\n', '').replace(/\s+/g, ' ');
  }
}

async function tests() {
  // Testing if search works
  const search_res = await fetch(plugin.search_url.replace("{title}", "one"));
  const search_data = await search_res.text();
  const search_test = eval(plugin.search + `search(${JSON.stringify(search_data)})`);
  if (
    !search_test[0].hasOwnProperty("id") ||
    !search_test[0].hasOwnProperty("title") ||
    !search_test[0].hasOwnProperty("img") ||
    !search_test[0].hasOwnProperty("plugin") ||
    !search_test[0].hasOwnProperty("authors") ||
    !search_test[0].hasOwnProperty("artists") ||
    !search_test[0].hasOwnProperty("description") ||
    !search_test[0].hasOwnProperty("chapters")
  ) {
    console.log("Search test failed; Missing field.");
    return false;
  }
  
  // Testing if getChapters works
  const chap_res = await fetch(plugin.chapters_url.replace("{id}", search_test[0].id));
  const chap_data = await chap_res.text();
  const chap_test = eval(plugin.get_chapters + `getChapters(${JSON.stringify(chap_data)})`);
  if (
    !chap_test[0].hasOwnProperty("id") ||
    !chap_test[0].hasOwnProperty("number") ||
    !chap_test[0].hasOwnProperty("title") ||
    !chap_test[0].hasOwnProperty("page") ||
    !chap_test[0].hasOwnProperty("completed")
  ) {
    console.log("Search test failed; Missing field.");
    return false;
  }

  // Testing if getChapters works
  const page_res = await fetch(plugin.pages_url.replace("{id}", chap_test[0].id));
  console.log(plugin.pages_url.replace("{id}", chap_test[0].id));
  const page_data = await page_res.text();
  const page_test = eval(plugin.get_pages + `getChapterPages(${JSON.stringify(page_data)})`);
  if (page_test.length <= 0) {
    console.log("Search test failed; Missing field.");
    return false;
  }
  return true;
}

// Tests plugin, then sends to file
tests().then((result) => {
  // Writes to a file, to be inserted as a plugin
  if (result) {
    fs.writeFile(`plugins/${plugin.id}.json`, JSON.stringify(plugin), (error) => {
        if (error) {
          console.error(error);
          throw error;
        }
    });
  }
})
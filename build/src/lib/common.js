// Commonly used functions
import { invoke } from '@tauri-apps/api/tauri';
import store from "./store.js";
let json;
store.subscribe(_json => {
    json = _json;
})

export function find_manga(id) {
    let manga;
    let manga_test = json.library.find(m => m.id == id);
    if (manga_test == undefined) {
        let search_test = json.search_results.find(m => m.id == id);
        if (search_test == undefined) {
            manga = json.history.find(m => m.id == id);
        } else {
            manga = search_test;
        }
    } else {
        manga = manga_test;
    }
    return manga;
}
export function in_lib(id) {
    return json.library.some(m => m.id == id);
}

export async function toggle_favorite(manga) {
    console.log(manga);
    if (!in_lib(manga.id)) {
        await invoke('add_to_lib', { newItem: manga });
        store.update(_json => {
            _json.library.push(manga);
            return _json;
        });
    } else {
        await invoke('remove_from_lib', { id: manga.id });
        store.update(_json => {
            _json.library = _json.library.filter(m => m.id != manga.id);
            return _json;
        });
    }
}
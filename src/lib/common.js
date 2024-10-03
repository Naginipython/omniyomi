import { invoke } from "@tauri-apps/api/core";
import Database from '@tauri-apps/plugin-sql';
import store from "$lib/store.js";
let json;
let db;
store.subscribe(_json => {
    json = _json;
});

// Setup
export async function setup(media_screen) {
    db = await Database.load('sqlite:subete.db');

    let manga_library = await db.select("SELECT * FROM manga_library");
    console.log(manga_library);
    manga_library.forEach(manga => manga.chapters = []);
    let manga_history = await invoke('get_manga_history');
    let manga_updates = await invoke('get_manga_updates_list');
    let anime_library = await invoke('get_anime_lib');
    let anime_updates = await invoke('get_anime_updates_list');
    let ln_library = await invoke('get_ln_lib');
    let ln_updates = await invoke('get_ln_updates_list');
    let settings = await invoke('get_settings');
    store.update(json => {
        json.manga_library = manga_library;
        json.manga_history = manga_history;
        json.manga_updates = manga_updates;
        json.anime_library = anime_library;
        json.anime_updates = anime_updates;
        json.ln_library = ln_library;
        json.ln_updates = ln_updates;
        json.settings = settings;
        json.media_screen = media_screen;
        return json;
    });

    // SETS AND INITS SETTINGS
    if (!settings.hasOwnProperty("app_colors")) {
        // init
        settings['app_colors'] = {theme: "Nagini's dark", primary: "1a1a1a", secondary: "330000", selection: "800000", text: "ffffff"};
        await invoke('update_settings', { newSettings: {"app_colors":settings['app_colors']}});
    }
    document.documentElement.style.setProperty('--primary-color', `#${settings['app_colors'].primary}`); 
    document.documentElement.style.setProperty('--secondary-color', `#${settings['app_colors'].secondary}`); 
    document.documentElement.style.setProperty('--selection-color', `#${settings['app_colors'].selection}`); 
    document.documentElement.style.setProperty('--text-color', `#${settings['app_colors'].text}`); 

    if (!settings.hasOwnProperty("library_widths")) {
        // init
        settings['library_widths'] = { manga: '100', ln: '100', anime: '100' };
        await invoke('update_settings', { newSettings: {"library_widths":settings['library_widths']}});
    }
    document.documentElement.style.setProperty('--lib-manga-width', `${settings['library_widths'].manga}px`); 
    document.documentElement.style.setProperty('--lib-ln-width', `${settings['library_widths'].ln}px`); 
    document.documentElement.style.setProperty('--lib-anime-width', `${settings['library_widths'].ln}px`); 
    
    // sets inits
    store.update(json => {
        json.settings = settings;
        return json;
    });
}

export async function get_entries(type, entry_type, plugin, id) {
    let item = await find_item(type, plugin, id);
    let entries = await db.select("SELECT * FROM manga_chapters WHERE manga_id=$1 AND plugin=$2", [id, plugin]);
    entries.forEach(e => e.completed = e.completed=="true"? true : false);
    
    if (entries.length == 0) {
        item[entry_type] = entries;
        // Calls backend for plugin chapter/episode retrieval
        let updated_item = await invoke(`get_${type}_${entry_type}`, { item });
        if (!updated_item.hasOwnProperty("error")) {
            // entries = 
            if (type=="anime") {
                // TODO
                item.studio = updated_item.studio;
                item.status = updated_item.status;
            } else {
                await db.execute(
                    "UPDATE manga_library SET authors=$1, artists=$2, description=$3 WHERE id=$4 AND plugin=$5",
                    [updated_item.author, updated_item.artist, updated_item.description, id, plugin]
                );
            }
            entries = updated_item[entry_type];
            entries.forEach(async entry => {
                await db.execute(
                    `INSERT INTO ${type+"_"+entry_type} (chapter_id,manga_id,plugin,number,title,page,completed) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
                    [entry.id, id, plugin, entry.number, entry.title, entry.page, entry.completed]
                );
            })
        } else {
            return { error: updated_item.error };
        }
    }
    return { result: entries };
}

export async function find_item(type, plugin, id) {
    let lib = `${type}_library`;
    let item = (await db.select(`SELECT * FROM ${lib} WHERE id=$2 AND plugin=$3`, [lib, id, plugin]))[0];

    // The plan: check lib first. Then history (to include same fields as lib & more). Then browse?
    if (item == undefined) {
        // search results
        item = json[`${type}_search_results`].map(i => i.data).flat().find(i => i.id == id && (i.plugin==plugin || plugin==null));
        if (item==undefined) {
            // todo: hist
                // hist to item
                let hist = json[`${type}_history`].find(i => i.id==id && (i.plugin==plugin || plugin==null));
                if (type=="anime") {
                    item = {
                        id: hist.id,
                        title: hist.title,
                        img: hist.img,
                        plugin: hist.plugin,
                        studio: "",
                        status: "",
                        description: "",
                        episodes: []
                    }
                } else {
                    item = {
                        id: hist.id,
                        title: hist.title,
                        img: hist.img,
                        plugin: hist.plugin,
                        authors: "",
                        artists: "",
                        description: "",
                        chapters: []
                    };
                }
        }
        // add to temp for quicker access
        if (!json[`${type}_temp`].some(i => i.id==id && i.plugin==plugin)) {
            json[`${type}_temp`].unshift(item);
        }
    }
    return item==undefined? {} : item;
}
export function in_lib(type, id) {
    return json[`${type}_library`].some(i => i.id == id);
}
export async function toggle_favorite(type, item) {
    let lib = `${type}_library`;


    if (!in_lib(type, item.id)) {
        //new
        db.execute(
            `INSERT INTO ${lib} (id,title,img,plugin,authors,artists,description) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
            [item.id, item.title, item.img, item.plugin, item.authors, item.artists, item.description]
        );

        //old
        await invoke(`add_to_${type}_lib`, { newItem: item });
        store.update(_json => {
            _json[`${type}_library`].push(item);
            return _json;
        });
    } else {
        // new
        db.execute(
            `DELETE FROM ${lib} WHERE id=$1 AND plugin=$2`,
            [item.id, item.plugin]
        );

        // old
        await invoke(`remove_from_${type}_lib`, { id: item.id });
        store.update(_json => {
            _json[`${type}_library`] = _json[`${type}_library`].filter(i => !(i.id==item.id && i.plugin==item.plugin));
            return _json;
        });
    }
}
export async function update(type) {
    // vars for easier readability
    let entry_type = type=="anime"? "episodes" : "chapters";
    let lib = `${type}_library`;
    let progress = `${type}_update_progress`;
    
    const updated = () => store.update(_json => { _json[progress] = json[progress]; return _json; });
    json[progress] = {
        curr: "",
        index: 0,
        total: json[lib].length
    };
    updated();

    // re-fetch every item entry, comapre to what we have, add to updates
    for (let i = 0; i < json[lib].length; i++) {
        // Progress bar
        json[progress].curr = json[lib][i].title;
        json[progress].index = json[progress].index+1;
        updated();

        // Update
        let new_data = await invoke(`get_${type}_${entry_type}`, { item: json[lib][i] });
        let entry = new_data[entry_type];

        // Gets new entries
        let new_entries = entry.filter(e => {
            return !json[lib][i][entry_type].some(o => o.id == e.id);
        }).reverse();
        json[lib][i] = new_data;

        // Adds to updates list
        for (let j = 0; j < new_entries.length; j++) {
            let item = type=="anime"? {
                    id: json[lib][i].id,
                    title: json[lib][i].title,
                    img: json[lib][i].img,
                    plugin: json[lib][i].plugin,
                    episode: new_entries[j],
                    received: Date.now()
                } : {
                    id: json[lib][i].id,
                    title: json[lib][i].title,
                    img: json[lib][i].img,
                    plugin: json[lib][i].plugin,
                    chapter: new_entries[j],
                    received: Date.now()
                };
            store.update(_json => {
                // removes from [item]_temp
                let dropIndex = _json[`${type}_temp`].findIndex(t => t.id == json[lib][i].id && t.plugin == json[lib][i].plugin);
                _json[`${type}_temp`].splice(dropIndex, 1);
                // item = json[`${type}_temp`].find(i => i.id==id && (i.plugin==plugin || plugin==null));

                _json[`${type}_updates`].unshift(item);
                _json[lib] = json[lib];
                return _json;
            });
        }
        await invoke(`update_${type}_lib`, { item: json[lib][i] })
    }
    await invoke(`save_${type}_updates_list`, { items: json[`${type}_updates`] });
    json[progress] = null;
    updated();
}
export function find_entry_index_by_id(type, id, entry_id) {
    let item = find_item(type, null, id);
    if (type == "anime") {
        return item.episodes.findIndex(c => c.id == entry_id);
    } else {
        return item.chapters.findIndex(c => c.id == entry_id);
    }
}
import { openDB, deleteDB, wrap, unwrap } from 'https://unpkg.com/idb?module';

const DB_NAME = 'hotdogdb';
const DB_VERSION = 1;
let DB;

export default {
  async getDB() {
    return new Promise((resolve, reject) => {
      if(DB) { resolve(DB); }

      console.log('opening DB');

      let request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = e => {
        console.log('error opening db');
        reject('Error');
      }

      request.onsuccess = e => {
        DB = e.target.result;
        resolve(DB);
      }

      request.onupgradeneeded = e => {
        console.log('onupgradeneeded');
        let db = e.target.result;
        let objectStore = db.createObjectStore('hotdogs', { autoIncrement: true, keyPath: 'id' });

        objectStore.createIndex('id', 'id', { unique: true });
        objectStore.createIndex('privacy', 'privacy', { unique: false });
        objectStore.createIndex('hotdog', 'hotdog', { unique: false });
        objectStore.createIndex('cooked', 'cooked', { unique: false });
        objectStore.createIndex('bun', 'bun', { unique: false });
        objectStore.createIndex('toppings', 'toppings', { unique: false });
        objectStore.createIndex('how_many', 'how_many', { unique: false });
        

      }
    })
  },
  async deleteHotdog(hotdog) {
    let db = await this.getDB();

    return new Promise(resolve => {
      let trans = db.transaction(['hotdogs'], 'readwrite');
      trans.oncomplete = () => {
        resolve();
      }

      let store = trans.objectStore('hotdogs');
      store.delete(hotdog.id);
    })
  },
  async getHotdogs() {
    let db = await this.getDB();

    return new Promise(resolve => {
      let trans = db.transaction(['hotdogs'], 'readonly');
      trans.oncomplete = () => {
        resolve(hotdogs);
      }

      let store = trans.objectStore('hotdogs');
      let hotdogs = [];

      store.openCursor().onsuccess = e => {
        let cursor = e.target.result;

        if(cursor) {
          hotdogs.push(cursor.value);
          cursor.continue();
        }
      }
    })
  },
  async saveHotdog(hotdog) {
    let db = await this.getDB();

    return new Promise(resolve => {
      let trans = db.transaction(['hotdogs'], 'readwrite');
      trans.oncomplete = () => {
        resolve();
      }

      let store = trans.objectStore('hotdogs');
      store.put(hotdog);
    })
  },
  async setCustomerId(id) {
    let db = await this.getDB();

    return new Promise(resolve => {
      let trans = db.transaction(['hotdogs'], 'readwrite');
      trans.oncomplete = () => {
        resolve();
      }

      let store = trans.objectStore('hotdogs');
      var item = { id: id };
      store.put(item);
    })
  }
}
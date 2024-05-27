import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, jate: content });
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

function getCodeContentFromIndexedDB() {
  return new Promise((resolve, reject) => {
    // Assuming 'db' is your IndexedDB instance and 'store' is the object store
    const transaction = db.transaction(['store'], 'readonly');
    const objectStore = transaction.objectStore('store');
    const request = objectStore.get('codeContent');

    request.onsuccess = function(event) {
      resolve(request.result);
    };

    request.onerror = function(event) {
      reject('Error retrieving data from IndexedDB');
    };
  });
}

module.exports = {
  getCodeContentFromIndexedDB
};

initdb();

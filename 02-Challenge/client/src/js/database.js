// database.js
import { openDB } from 'idb';

// Initialize the database
const initdb = async () => {
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
};

// Function to save content to the database
export const putDbContent = async (content) => {
  console.log('Saving content to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Content saved to database', result);
};

// Method to get content from the database
export const getDbContent = async () => {
  console.log('Fetching content from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const allContent = await store.getAll();
  console.log('Content retrieved from database', allContent);
  return allContent || []; // Ensure the return value is an array
};

// Initialize the database
initdb();
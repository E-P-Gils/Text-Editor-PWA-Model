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
  const db = await openDB('jate', 1);
  const transaction = db.transaction('jate', 'readwrite');
  const objectStore = transaction.objectStore('jate');

  const newItem = { todo: content };
  const request = objectStore.add(newItem);

  request.onsuccess = () => {
    console.log('Data added to the database successfully');
  };

  request.onerror = () => {
    console.error('Error adding data to the database');
  };

  transaction.oncomplete = () => {
    db.close();
  };

  form.reset();
  fetchList();
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const transaction = db.transaction('jate', 'readonly');
  const objectStore = transaction.objectStore('jate');
  const request = objectStore.getAll();

  request.onsuccess = () => {
    const result = request.result;

    let listItem = '';

    for (let data of result) {
      console.log(data);
      listItem += `
      <div class="flex-row align-center justify-space between" id="${data.id}">
        <li class="mr-2" id="list-item" onclick="deleteItem(this)">${data.todo}</li>
        <button class="btn btn-sm btn-info" onclick="editList(this)" id="edit-btn">Edit</button>
      </div>
      `;
    }

    document.getElementById('list-group').innerHTML = listItem;
  };

  request.onerror = () => {
    console.error('Error retrieving data from the database');
  };

  transaction.oncomplete = () => {
    db.close();
  };
};

initdb();

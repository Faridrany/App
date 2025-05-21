import { openDB } from 'idb';

const DB_NAME = 'app-db';
const STORE_NAME = 'stories';

/**
 * Inisialisasi database dengan object store 'stories'
 */
export async function initDB() {
  try {
    return await openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      },
    });
  } catch (error) {
    console.error('Gagal membuka database:', error);
    throw error;
  }
}

/**
 * Simpan atau perbarui satu story ke IndexedDB
 * @param {Object} story - Objek story dengan properti `id`
 */
export async function saveStory(story) {
  try {
    const db = await initDB();
    return await db.put(STORE_NAME, story);
  } catch (error) {
    console.error('Gagal menyimpan story:', error);
    throw error;
  }
}

/**
 * Ambil semua story dari IndexedDB
 * @returns {Promise<Array>}
 */
export async function getAllStories() {
  try {
    const db = await initDB();
    return await db.getAll(STORE_NAME);
  } catch (error) {
    console.error('Gagal mengambil semua story:', error);
    return [];
  }
}

/**
 * Ambil satu story berdasarkan ID dari IndexedDB
 * @param {string|number} id - ID dari story
 * @returns {Promise<Object|null>}
 */
export async function getStoryById(id) {
  try {
    const db = await initDB();
    return await db.get(STORE_NAME, id);
  } catch (error) {
    console.error(`Gagal mengambil story dengan ID ${id}:`, error);
    return null;
  }
}

/**
 * Hapus story berdasarkan ID
 * @param {string|number} id - ID dari story yang ingin dihapus
 */
export async function deleteStory(id) {
  try {
    const db = await initDB();
    return await db.delete(STORE_NAME, id);
  } catch (error) {
    console.error(`Gagal menghapus story dengan ID ${id}:`, error);
    throw error;
  }
}

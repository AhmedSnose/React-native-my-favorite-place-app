import { openDatabaseAsync } from "expo-sqlite";

export async function init() {
  const database = await openDatabaseAsync("places.db");
  return await database.runAsync(`CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    imageUri TEXT NOT NULL,
    address TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL
  );`);
}

export async function insertPlace(place) {
  try {
    const database = await openDatabaseAsync("places.db");

    const result = await database.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]
    );

    return {
      lastInsertRowId: result.lastInsertRowId,
      changes: result.changes,
    };
  } catch (error) {
    console.log(error, "insertPlace error");
    throw error;
  }
}

export async function fetchAllPlaces() {
  try {
    const database = await openDatabaseAsync("places.db");
    const places = await database.getAllAsync(`SELECT * FROM places`);
    
    return places
  } catch (error) {
    console.log(error, "fetchAllPlaces error");
    throw error;
  }
}


export async function fetchPlaceDetails(id) {
  try {
    const database = await openDatabaseAsync("places.db");
    const place = await database.getFirstAsync(
      `SELECT * FROM places WHERE id = ?`,
      [id]
    );

    return place;
  } catch (error) {
    console.log(error, "fetchPlaceDetails error");
    throw error; 
  }
}
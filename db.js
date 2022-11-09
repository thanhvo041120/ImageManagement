import * as SQLite from "expo-sqlite";
const TABLE_TRIP = "images";
const KEY_ID = "id";
const KEY_URL = "url";
export const db = SQLite.openDatabase("trips");
export const createDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      " CREATE TABLE IF NOT EXISTS " +
        TABLE_TRIP +
        " (" +
        KEY_ID +
        " INTEGER PRIMARY KEY AUTOINCREMENT," +
        KEY_URL +
        " TEXT NOT NULL " +
        " ) ",
      [],
      () => {
        console.log("success");
      },
      (error) => {
        console.log("ERROR", error);
      }
    );
  });
};
export const addImage = (url) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO " +
        TABLE_TRIP +
        " ( " +
        KEY_URL +
        ") values (?)",
      [
        url
      ],
      (txObj, resultSet) => {
        console.log(resultSet.insertId);
      },
      (txObj, error) => console.log("Error", error)
    );
  });
};
export const getImages = (setData) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM images",
      null,
      (txObj, resultSet) => {
        setData(resultSet.rows._array);
      },
      (txObj, error) => console.log("Error ", error)
    );
  });
};
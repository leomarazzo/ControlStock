import { openDatabase } from "expo-sqlite";

export const startDatabaseIfNot = () => {
    const db = openDatabase("StockControl");
    db.transaction((tx) =>
      tx.executeSql(
        "CREATE TABLE IF NOT exists Products (id integer primary key not null, name text, stock integer, stockminimo integer)",
        [],
        () => {},
        (_, error) => {
          
          return false;
        }
      )
    );
};

export const createProduct = (
    id: number,
    name: string,
    stock:  number,
    stockMin: number,
  ) => {
    const db = openDatabase("StockControl");
    db.transaction((tx) =>
      tx.executeSql(
        "Insert into Products (id, name, stock, stockmin ) values (?,?,?,?)",
        [id, name, stock, stockMin],
        () => {},
        (_, error) => {
          
          return false;
        }
      )
    );
};

export const listProducts = async () => {
  
  return new Promise(
    (resolve: (arg: any[]) => void, reject: (err: any) => void) =>
    openDatabase("StockControl").transaction((tx) =>
      tx.executeSql(
        "Select * from Products",
        [],
        (_, {rows}) => {resolve((rows as any)._array)},
        (_, error) => {
          
          return false;
        }
      )
    )
  );
};

export const changeProduct = (
    id: number,
    name: string,
    stock:  number,
    stockMin: number,
  ) => {
    const db = openDatabase("StockControl");
    db.transaction((tx) =>
      tx.executeSql(
        "Update Products set name = ?, stock = ?, stockmin = ? where id like ?",
        [name, stock, stockMin, id],
        () => {},
        (_, error) => {
          
          return false;
        }
      )
    );
  };
  
  export const removeProduct = (id: number) => {
    const db = openDatabase("StockControl");
    db.transaction((tx) =>
      tx.executeSql(
        "Delete from Products where id like ?",
        [id],
        () => {},
        (_, error) => {
          
          return false;
        }
      )
    );
  };
  




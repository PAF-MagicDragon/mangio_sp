import { observable, action, computed } from "mobx";
import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: "ESDatabase.db" });

export class Store {
  @observable var1 = "my store var 1";
  @observable var2 = "my store var 2";
  @observable lists = [];

  @action addList = (value) => {
    this.lists.push(value);
  };

  @action initializeTable = (name, cols) => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='" +
          { name } +
          "'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS " + { name } + "", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS " + { name } + "(" + { cols } + ")",
              []
            );
          }
        }
      );
    });
  };

  @action initializeAllTables = () => {
    this.initializeTable(
      "table_user",
      "user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255)"
    );
  };

  //   @computed get filteredLists() {
  //     const matchCase = new RegExp(this.filter, "i");
  //     return this.lists.filter(
  //       (list) => !this.filter || matchCase.test(list.value)
  //     );
  //   }
}

import React from "react";
import Main from "./src/Main";
import { Store } from "./src/helpers/store";
import ESContext from "./src/ESContext";

export default class App extends React.Component {
  render() {
    const store = new Store();
    return (
      <ESContext.Provider value={store}>
        <Main />
      </ESContext.Provider>
    );
  }
}

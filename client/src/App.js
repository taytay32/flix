import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import UploadPage from "./components/UploadPage/UploadPage";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/UploadPage" component={UploadPage} />
          <Route path="/videos/:videoID" component={HomePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

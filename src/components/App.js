import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import apikey from "../config";
import Nav from "./Nav";
import PhotoContainer from "./PhotoContainer";
import SearchForm from "./SearchForm";
import NoTFound from "./NotFound";

class App extends Component {
  state = {
    dogs: [],
    foods: [],
    athletics: [],
    search: [],
    loading: true,
  };

  componentDidMount() {
    this.getDogs();
    this.getFoods();
    this.getRunners();
    this.performSearch();
  }

  //This method fetches the Sunset topic link
  getDogs = () => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        this.setState({ dogs: response.data.photos.photo, loading: false });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  //This method fetches the Rainbow topic link
  getFoods = () => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=foods&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        this.setState({ foods: response.data.photos.photo, loading: false });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  //This method fetches the Waterfall topic link
  getRunners = () => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=athletics&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        this.setState({
          athletics: response.data.photos.photo,
          loading: false,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  performSearch = (query) => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        this.setState({ search: response.data.photos.photo, loading: false });
      })
      .catch((error) => {
        console.log("Error  fetching and parsing data", error);
      });
  };
  render() {
    const { dogs, foods, search, athletics, loading } = this.state;
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} />
          <Nav />
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/dogs" loading={loading} />}
            />
            <Route
              path="/search/:query"
              render={() => (
                <PhotoContainer flickr={search} loading={loading} />
              )}
            />
            <Route
              path="/dogs"
              render={() => <PhotoContainer flickr={dogs} loading={loading} />}
            />
            <Route
              path="/foods"
              render={() => <PhotoContainer flickr={foods} loading={loading} />}
            />
            <Route
              path="/athletics"
              render={() => (
                <PhotoContainer flickr={athletics} loading={loading} />
              )}
            />
            <Route component={NoTFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

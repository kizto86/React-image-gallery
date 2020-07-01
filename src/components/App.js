import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import apikey from "../config";
import Nav from "./Nav";
import PhotoContainer from "./PhotoContainer";
import SearchForm from "./SearchForm";
import NoTFound from "./NotFound";

const App = () => {
  //loads the data immediately the App component is mounted to the DOM
  useEffect(() => {
    fetchSunset();
    fetchRainbow();
    fetchWaterfall();
    performSearch();
  }, []);

  //defining states
  const [sunset, setSunset] = useState([]);
  const [rainbow, setRainbow] = useState([]);
  const [waterfall, setWaterfall] = useState([]);
  const [search, setSearch] = useState([]);

  //The method fetches the Sunset topic link
  const fetchSunset = async () => {
    const fetchSunset = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=sunset&per_page=24&format=json&nojsoncallback=1`
    );
    const result = await fetchSunset.json();
    const sunset = result.photos.photo;
    setSunset(sunset);
  };

  //This method fetches the Rainbow topic link
  const fetchRainbow = async () => {
    const fetchRainbow = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=rainbow&per_page=24&format=json&nojsoncallback=1`
    );
    const result = await fetchRainbow.json();
    const rainbow = result.photos.photo;
    setRainbow(rainbow);
  };

  //This method fetches the Waterfall topic link

  const fetchWaterfall = async () => {
    const fetchWaterfall = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=waterfall&per_page=24&format=json&nojsoncallback=1`
    );
    const result = await fetchWaterfall.json();
    const waterfall = result.photos.photo;
    setWaterfall(waterfall);
  };

  const performSearch = async (query) => {
    const performSearch = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=${query}&per_page=2&format=json&nojsoncallback=1`
    );
    const fetchResult = await performSearch.json();
    const searchResult = fetchResult.photos.photo;
    console.log(searchResult);
    setSearch(searchResult);
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Nav />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/rainbow" />} />
          <Route
            path="/search"
            render={() => <SearchForm search={performSearch} />}
          />
          <Route
            path="/rainbow"
            render={() => <PhotoContainer flickrs={rainbow} />}
          />
          <Route
            path="/sunset"
            render={() => <PhotoContainer flickrs={sunset} />}
          />
          <Route
            path="/waterfall"
            render={() => <PhotoContainer flickrs={waterfall} />}
          />
          <Route component={NoTFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;

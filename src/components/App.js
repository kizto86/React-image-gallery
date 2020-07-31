import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import apikey from "../config";
import Nav from "./Nav";
import PhotoContainer from "./PhotoContainer";
import SearchForm from "./SearchForm";
import NoTFound from "./NotFound";

const sunsetUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=sunset&per_page=24&format=json&nojsoncallback=1`;
const rainbowUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=rainbow&per_page=24&format=json&nojsoncallback=1`;
const waterfallUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=waterfall&per_page=24&format=json&nojsoncallback=1`;

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
  const [loading, setLoading] = useState(true);

  //This method fetches the Sunset topic link
  const fetchSunset = async () => {
    try {
      const fetchSunset = await fetch(sunsetUrl);
      const result = await fetchSunset.json();
      const sunset = result.photos.photo;
      setSunset(sunset);
    } catch (error) {
      console.log("Error occurred while fetching and parsing the data", error);
    }
  };

  //This method fetches the Rainbow topic link
  const fetchRainbow = async () => {
    try {
      const fetchRainbow = await fetch(rainbowUrl);
      const result = await fetchRainbow.json();
      const rainbow = result.photos.photo;
      setRainbow(rainbow);
    } catch (error) {
      console.log("Error occurred while fetching and parsing data", error);
    }
  };

  //This method fetches the Waterfall topic link

  const fetchWaterfall = async () => {
    try {
      const fetchWaterfall = await fetch(waterfallUrl);
      const result = await fetchWaterfall.json();
      const waterfall = result.photos.photo;
      setWaterfall(waterfall);
    } catch (error) {
      console.log("Error occurred while fetching and parsing data", error);
    }
  };

  const performSearch = async (query) => {
    try {
      const performSearch = await fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      );
      const fetchResult = await performSearch.json();
      const searchResult = fetchResult.photos.photo;
      setSearch(searchResult);
      setLoading(false);
    } catch (error) {
      console.log("Error occurred while fetching and parsing data", error);
    }
  };

  return (
    <BrowserRouter>
      <div className="container">
        <SearchForm search={performSearch} loading={loading} />
        <Nav />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/rainbow" />} />
          <Route
            path="/search/:query"
            render={() => <PhotoContainer flickrs={search} loading={loading} />}
          />
          <Route
            path="/rainbow"
            render={() => (
              <PhotoContainer flickrs={rainbow} loading={loading} />
            )}
          />
          <Route
            path="/sunset"
            render={() => <PhotoContainer flickrs={sunset} loading={loading} />}
          />
          <Route
            path="/waterfall"
            render={() => (
              <PhotoContainer flickrs={waterfall} loading={loading} />
            )}
          />
          <Route component={NoTFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;

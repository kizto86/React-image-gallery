import React, { Fragment } from "react";
import Photo from "./Photo";
import NoResult from "./NoResult";

const navStyle = {
  color: "green",
};

const PhotoContainer = ({ flickrs, loading }) => {
  let data = flickrs;
  let result;

  if (data.length > 0) {
    result = data.map((flickr) => (
      <Photo
        key={flickr.id.toString()}
        photo={`https://farm${flickr.farm}.staticflickr.com/${flickr.server}/${flickr.id}_${flickr.secret}.jpg`}
      />
    ));
  } else {
    result = <NoResult />;
  }

  return (
    <Fragment>
      {loading ? <h1 style={navStyle}>Loading........</h1> : <ul>{result} </ul>}
    </Fragment>
  );
};
export default PhotoContainer;

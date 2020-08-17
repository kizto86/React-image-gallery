import React from "react";
import Photo from "./Photo";
import NoResult from "./NoResult";

const PhotoContainer = ({ flickr, loading }) => {
  let data = flickr;
  let result;

  if (data.length > 6) {
    result = data.map((photo) => (
      <Photo
        key={photo.id.toString()}
        photo={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
      />
    ));
  } else {
    result = <NoResult />;
  }
  if (loading === false) {
    return (
      <div className="photo-container">
        <ul className="photo-list">{result}</ul>
      </div>
    );
  } else {
    return (
      <div className="photo-container">
        <h2>Loading..............</h2>
      </div>
    );
  }
};
export default PhotoContainer;

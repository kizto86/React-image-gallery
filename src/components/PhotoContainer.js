import React, { Fragment } from "react";
import Photo from "./Photo";

const PhotoContainer = ({ flickrs }) => {
  let result;

  result = flickrs.map((flickr) => (
    <Photo
      key={flickr.id.toString()}
      photo={`https://farm${flickr.farm}.staticflickr.com/${flickr.server}/${flickr.id}_${flickr.secret}.jpg`}
    />
  ));

  return (
    <Fragment>
      <ul>{result} </ul>
    </Fragment>
  );
};
export default PhotoContainer;

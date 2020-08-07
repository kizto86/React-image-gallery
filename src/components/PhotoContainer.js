import React, { Fragment } from "react";
import Photo from "./Photo";
import NoResult from "./NoResult";

const navStyle = {
  color: "green",
};

const PhotoContainer = ({ flickrs, loading }) => {
  let data = flickrs;
  let result;
  console.log(data);

  if (data.length > 0) {
    result = data.map((photo) => (
      <Photo
        key={photo.id.toString()}
        photo={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
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

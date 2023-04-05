import React from "react";
import { useMapEvents } from "react-leaflet";
const LocationFinderDummy = (props) => {
  useMapEvents({
    click: (e) => {
      const latlng = e.latlng;
      props.func(latlng);
    },
  });
  return null;
};

export { LocationFinderDummy };

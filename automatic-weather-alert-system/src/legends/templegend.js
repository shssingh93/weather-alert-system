import React from "react";
import "../index.css";

const TempLegend = () => {
  return (
    <div className="legendContainer">
      <p className="legend-title">
        Temp <sup>O</sup>C
      </p>
      <div className="temp-legend">
        <span>-20</span>
        <span>-10</span>
        <span>0</span>
        <span>10</span>
        <span>20</span>
        <span>30</span>
        <span>40</span>
        <span>50</span>
      </div>
    </div>
  );
};
export { TempLegend };

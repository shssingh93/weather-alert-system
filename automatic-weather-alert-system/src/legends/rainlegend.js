import React from "react";
import "../index.css";

const RainLegend = () => {
  return (
    <div className="legendContainer">
      <p className="legend-title">Rain mm</p>
      <div className="rain-legend">
        <span>5</span>
        <span>10</span>
        <span>20</span>
        <span>40</span>
        <span>60</span>
        <span>100</span>
        <span>150</span>
        <span>200</span>
      </div>
    </div>
  );
};
export { RainLegend };

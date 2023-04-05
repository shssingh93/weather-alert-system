import React from "react";

const Precipitationlegend = () => {
  return (
    <div className="legendContainer">
      <p className="legend-title">Precipitation mm</p>
      <div className="precipitation-legend">
        <span>0</span>
        <span>1</span>
        <span>2</span>
        <span>4</span>
        <span>6</span>
        <span>10</span>
        <span>12</span>
        <span>16</span>
        <span>24</span>
        <span>32</span>
        <span>60</span>
      </div>
    </div>
  );
};

export { Precipitationlegend };

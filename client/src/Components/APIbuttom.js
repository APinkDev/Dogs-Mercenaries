import React from "react";
import "./APIbuttom.css";
export default function APIbuttom({ FilterType }) {

  return (
    <div className="API__div">
      <select 
      className="API__button"
        defaultValue={"DEFAULT"}
        onChange={(e) => FilterType(e.target.value)}
      >
        <option value="DEFAULT" disabled>
          Type:
        </option>
        <option value="ALL">All Dogs</option>
        <option value="API">API Dogs</option>
        <option value="DB">DB Dogs</option>
      </select>
    </div>
  );
}

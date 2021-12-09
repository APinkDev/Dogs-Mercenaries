import React from "react";
import "./AZbuttom.css";
export default function AZbuttom({ Azbuttoms }) {
  return (
    <div className="AZ__div">
      <select
      className="AZ__button"
        defaultValue={"DEFAULT"}
        onChange={(e) => Azbuttoms(e.target.value)}
      >
        <option value="DEFAULT" disabled>
          Sort by:
        </option>
        <option value="">uwu</option>
        <option value="AZ">AZ</option>
        <option value="ZA">ZA</option>
        <option value="LowWeight">High Weight</option>
        <option value="HighWeight">Low Weight</option>
      </select>
    </div>
  );
}

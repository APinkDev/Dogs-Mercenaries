import React from "react";
import {  useSelector } from "react-redux";
import "./FiltedButton.css";

export default function FiltedButton({ Filtred }) {
  const temps = useSelector((state) => state.DBTemps);

  const [buton, setButon] = React.useState([]);
  const handleOnClick = (e) => {
    e.target.disable = true;

    setButon((elm) => [...elm, e.target.value]);
  };
  const handleOnSubmit = (e) => {
    setTimeout(() => {
      Filtred(buton);
      setButon([]);
    },2000)
  };

  return (
    <div className="Filtred__div">
      <form onSubmit={handleOnSubmit}>
        <select onChange={handleOnClick} className="Filtred__button">
          {temps.map((e, index) => (
            <option  key={index} value={e.temp} >
              {e.temperament}
            </option>
          ))}
        </select>
        <button className="FIltred__Filter" type="submit">Apply Filters</button>
      </form>
    </div>
  );
}

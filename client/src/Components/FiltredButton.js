import React from "react";
import {  useSelector } from "react-redux";
import "./FiltedButton.css";
// import { GetTemps useDispatch,} from "../Store/actions.js";

export default function FiltedButton({ Filtred }) {
//   const dispatch = useDispatch();
  const temps = useSelector((state) => state.DBTemps);

  const [buton, setButon] = React.useState([]);
  const handleOnClick = (e) => {
    e.target.disable = true;

    setButon((elm) => [...elm, e.target.value]);
    // console.log("HOL! PEERO TU2: ",e.target.value, "buton2", buton)
  };
  const handleOnSubmit = (e) => {
      // console.log(buton)
    // for (let i = 0; i < e.target.length; i++) {
    //   e.target[i].disable = false;
    // }
    Filtred(buton);
    setButon([]);
  };

//   React.useEffect(() => {
//     dispatch(GetTemps());
//   }, [dispatch]);

//   const temperam = temps.map((e) => (e))



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

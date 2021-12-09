import React from "react";
import { Link } from "react-router-dom";
import "./Dog.css";

export default function Dog({ id, name, img, temperament,  height, weight, years  }) {
  // console.log("nombre: ", temperament)
  return (
    <div>
      <Link to={`details/${id}`}>
        <div
          className="Dog__All"
          style={{ backgroundImage: `url('${img}')` }}>
          <div className="Dog__ContainerImg">
            <div className="Dog__info">
            {name},
            weight: {weight},
            {/* {height}, */}
            {/* {years}, */}
            </div>
            <div><span className="Dog__temp">{temperament}</span></div>
            {/* <div className="Dog__temperaments">
            {Array.isArray(temperament) ? (
                temperament.map((a) => (
                  <li key={a}>
                    <span>{a} </span>
                  </li>
                ))
              ) : (
                <span>{temperament}</span>
              )}
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
}

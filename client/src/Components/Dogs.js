import React from "react";
import Dog from "./Dog";

export default function Dogs({ dogsInfo, loading }) {
  // console.log ("doggs", dogsInfo)
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="dogsInfo">
      {dogsInfo && dogsInfo &&
        dogsInfo.map((e, index) => (
          <Dog
            key={index}
            id={e.id}
            name={e.name}
            weight={e.weight}
            height={e.height}
            img={e.img}
            temperament={e.temperament}
            years={e.years}
          />
        ))}
    </div>
  );
}

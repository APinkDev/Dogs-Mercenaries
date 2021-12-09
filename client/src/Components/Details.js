import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Detailed } from "../Store/actions";
import { useDispatch, useSelector } from "react-redux";
import "./Details.css";

const Details = (props) => {
  let id = props.match.params.id;
  // console.log("props", props)
  const dispatch = useDispatch();
  const detailed = useSelector((state) => state.Details);

  useEffect(() => {
    dispatch(Detailed(id));
  }, [id, dispatch]);

  // let TempArray = []
  console.log("Tempertament ede detalles : ", detailed);
  // console.log("la ide detales : ", id)
  let pataperro = [];
  if (detailed[0]) {
    pataperro = detailed[0];
  }

  return (
    <body className="Background__Details">
      <div className="Details__left">
        <img
          className="GameImg__img"
          src={detailed.img || pataperro.img}
          alt="background"
        ></img>
      </div>

      <div className="Details__right">
        <div className="Name__Details">{detailed.name || pataperro.name}</div>
        <div className="Released__Years">
        💖Lifespan: {detailed.years || pataperro.years}
        </div>
        <div className="Width">
        💖Height in cm: {detailed.height || pataperro.height}
        </div>
        <div className="Rating">
        💖Weight in kg: {detailed.weight || pataperro.weight}
        </div>
        <div className="temps__Details">
        💖Temperaments: {detailed.temperament || pataperro.temperament}
        </div>
      </div>
      <div className="">
        <Link to="/home" className="Details__rightdown">
        <p className="Details__rightdown__text">👉 Go Bark 👈</p>
        </Link>
      </div>
    </body>
  );
};

export default Details;

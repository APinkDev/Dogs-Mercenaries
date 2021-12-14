import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetTemps } from "../Store/actions.js";
import { Post } from "../Store/actions.js";
import "./Create.css";
export default function Create() {
  const dispatch = useDispatch();

  const temps = useSelector((state) => state.DBTemps);
  // const [error, setError] = useState({});

  const validate = (inputs) => {
    let error = {};
    if (!inputs.name) {
      error.name = "Name required";
    } //21 - 42
    else if (!inputs.minheight) {
      error.minheight = "height required";
    } else if (parseInt(inputs.minheight) > parseInt(inputs.maxheight)) {
      error.heightcomprobator = "minheight cannot be greater than maxheight";
    } else if (!inputs.maxheight) {
      error.maxheight = "height required";
    } else if (!inputs.img) {
      error.img = "img required";
    } else if (!inputs.minweight) {
      error.minweight = "minweight required";
    } else if (!inputs.maxweight) {
      error.maxweight = "maxweight required";
    } else if (parseInt(inputs.minweight) > parseInt(inputs.maxweight)) {
      error.weightcomprobator = "minweight cannot be greater than maxweight";
    } else if (!inputs.temp) {
      error.temp = "temp required";
    } else if (!inputs.minyears) {
      error.minyears = "minyears required";
    } else if (!inputs.maxyears) {
      error.maxyears = "maxyears required";
    } else if (parseInt(inputs.minyears) > parseInt(inputs.maxyears)) {
      error.yearscomprobator = "minyears cannot be greater than maxyears";
    }
    console.log("error:", JSON.stringify(error));
    return error;
  };

  const [inputs, setInputs] = useState({
    name: "",
    minheight: "",
    maxheight: "",
    img: "",
    minweight: "",
    maxweight: "",
    temp: [],
    minyears: "",
    maxyears: "",
  });

  React.useEffect(() => {
    dispatch(GetTemps());
  }, [dispatch]);

  // console.log("CSMtemps", temps)
  // const lasagna = (evt) => {
  //   console.log(inputs.temp)

  //   setInputs({
  //     ...inputs,
  //     [evt.target.name]: inputs.temp.concat(evt.target.value),
  //   });
  //   let count = inputs.temp.length
  //   for (let i = 0; i < count; i++) {
  //     if (evt.target.value === inputs.temp[i]) {
  //       let index = inputs.temp.indexOf(evt.target.value)
  //       inputs.temp.slice(index, 1)
  //       console.log(index)
  //       // evt.target.value && inputs.temp[i]
  //     }
  //   }
  // };

  const handleSubmit = (e) => {
    console.log(inputs);
    let completeheight = [inputs.minheight, inputs.maxheight];
    completeheight = completeheight.join(" - ");

    let completeweight = [inputs.minweight, inputs.maxweight];
    completeweight = completeweight.join(" - ");

    let completeyears = [inputs.minyears, inputs.maxyears];
    completeyears = completeyears.join(" - ");
    completeyears = completeyears + " years ";

    let campana = {
      name: inputs.name,
      img: inputs.img,
      temperament: inputs.temp,
      height: completeheight,
      weight: completeweight,
      years: completeyears,
    };
    console.log("complete inputs: ", campana);

    e.preventDefault();
    let error = Object.keys(validate(inputs));

    if (error.length !== 0) {
      alert("fill in the fields correctly");
    } else {
      dispatch(Post(campana));
      setInputs({
        name: "",
        minheight: "",
        maxheight: "",
        img: "",
        minweight: "",
        maxweight: "",
        temp: [],
        minyears: "",
        maxyears: "",
      });
      console.log(inputs);
      alert("well done! uwu");
    }
  };

  return (
    <div className="Background__create">
      <div className="Create__top">
        <h1 className="Create__title__top">Build a Dog</h1>
        <p className="Create__title__top__text">
          We have new generation technology to clone modified dogs,<br></br>
          just choose your data and in 20-30 days it will be available for you!~
        </p>
      </div>
      <div className="Create__left">
        <form onSubmit={handleSubmit}>
          <div className="Create__title">
            <input
              className="Create__Text"
              type="text"
              name="name"
              placeholder="...Name Tag..."
              value={inputs.name}
              onChange={(evt) =>
                setInputs({ ...inputs, [evt.target.name]: evt.target.value })
              }
            ></input>
          </div>
          <div className="Create__bars">
            <input
              className="Create__minyears"
              name="minyears"
              type="number"
              min="0"
              value={inputs.minyears}
              placeholder="minyears"
              onChange={(evt) =>
                setInputs({ ...inputs, [evt.target.name]: evt.target.value })
              }
            ></input>
            <input
              className="Create__maxyears"
              name="maxyears"
              type="number"
              min="0"
              value={inputs.maxyears}
              placeholder="MaxYears"
              onChange={(evt) =>
                setInputs({ ...inputs, [evt.target.name]: evt.target.value })
              }
            ></input>
            <input
              className="Create__minweight"
              type="number"
              min="0"
              name="minweight"
              value={inputs.minweight}
              placeholder="MinWeight"
              onChange={(evt) =>
                setInputs({ ...inputs, [evt.target.name]: evt.target.value })
              }
            ></input>
            <input
              className="Create__maxweight"
              type="number"
              min="0"
              name="maxweight"
              value={inputs.maxweight}
              placeholder="MaxWeight"
              onChange={(evt) =>
                setInputs({ ...inputs, [evt.target.name]: evt.target.value })
              }
            ></input>
            <input
              className="Create__minheight"
              type="number"
              min="0"
              name="minheight"
              value={inputs.minheight}
              placeholder="MinHeight"
              onChange={(evt) =>
                setInputs({ ...inputs, [evt.target.name]: evt.target.value })
              }
            ></input>
            <input
              className="Create__maxheight"
              type="number"
              min="0"
              name="maxheight"
              value={inputs.maxheight}
              placeholder="MaxHeight"
              onChange={(evt) =>
                setInputs({ ...inputs, [evt.target.name]: evt.target.value })
              }
            ></input>
          </div>

          <div className="Create__img">
            <input
              className="Create__URL"
              type="url"
              name="img"
              value={inputs.img}
              placeholder="Url link..."
              onChange={(evt) =>
                setInputs({ ...inputs, [evt.target.name]: evt.target.value })
              }
            ></input>
            <select
              className="Create__temperament"
              name="temp"
              value={inputs.temp}
              placeholder="Select 1 or more temps..."
              onChange={(evt) =>
                setInputs({
                  ...inputs,
                  [evt.target.name]: inputs.temp.concat(evt.target.value),
                })
              }
            >
              {temps.map((e, index) => (
                <option key={index} value={e.temp}>
                  {e.temperament}
                </option>
              ))}
            </select>
            <button type="submit" className="Create__Create">
              Build!
            </button>
          </div>
        </form>
      </div>
      <div className="Create__right"></div>
      <div className="Create__exit">
        <Link to="/home">
          <button className="Create__HomeButtom">Go Bark</button>
        </Link>
      </div>
    </div>
  );
}

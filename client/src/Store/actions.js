import axios from "axios";

export const DogsAll = () => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/dogs`);
    if (response?.data) {
      dispatch({
        type: "DOGSALL",
        payload: { dogs: response.data },
      });
    }
  };
};

export const SearchDog = (arg) => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/dogs?name=${arg}`);
    if (response?.data) {
      dispatch({
        type: "DOGSALL",
        payload: { dogs: response.data },
      });
    }
  };
};

// export const SearchDog = (arg) => { 
//   return async (dispatch) => {
//     try {
//       const result = await fetch(`http://localhost:3001/dogs?name=${arg}`);
//       const r = result.json();
//       // .then((result) => result.json())
//       // .then((r) => {
//       dispatch({ type: "DOGSALL", payload: { dogs: r } });
//       // });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

export const GetTemps = () => {
  return function (dispatch) {
    fetch(`http://localhost:3001/temps`)
      .then((result) => result.json())
      .then((r) => {
        dispatch({ type: "GETTEMPS", payload: r });
      });
  };
};

export const DogsID = (id) => {
  return function (dispatch) {
    fetch(`http://localhost:3001/dogs?name=${id}`)
      .then((result) => result.json())
      .then((r) => {
        dispatch({ type: "DOGSID", payload: r });
      });
  };
};

export const Detailed = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/${id}`);
      if (response?.data) {
        dispatch({ type: "DETAILED", payload: { detis: response.data } });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const Post = (inputs) => {
  return function (dispatch) {
    fetch("http://localhost:3001/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    }).then((resu) => console.log(resu));
  };
};

export const Filtrated = (arg) => {
  return {
    type: "FILTRATED",
    payload: arg,
  };
};
export const FiltratedType = (arg) => {
  return {
    type: "FILTRATEDTYPE",
    payload: arg,
  };
};
export const AZButtom = (arg) => {
  return {
    type: "AZBUTTOM",
    payload: arg,
  };
};

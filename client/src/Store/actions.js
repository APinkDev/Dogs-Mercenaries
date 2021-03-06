import axios from "axios";

export const DogsAll = () => {
  return async (dispatch) => {
    const response = await axios.get(`/dogs`);
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
    const response = await axios.get(`/dogs?name=${arg}`);
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
//       const result = await fetch(`/dogs?name=${arg}`);
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

// export const GetTemps = () => {
//   return function (dispatch) {
//     fetch(`/temps`)
//       .then((result) => result.json())
//       .then((r) => {
//         dispatch({ type: "GETTEMPS", payload: r });
//       });
//   };
// };

export const GetTemps = () =>{
  return async (dispatch) => {
    const response = await axios.get(`/temps`)
    if (response?.data) {
      dispatch({
        type: "GETTEMPS", payload: {dogs: response.data}
      })
    }
  }
}

// export const DogsID = (id) => {
//   return function (dispatch) {
//     fetch(`/dogs?name=${id}`)
//       .then((result) => result.json())
//       .then((r) => {
//         dispatch({ type: "DOGSID", payload: r });
//       });
//   };
// };

export const DogsID = (id) =>{
  return async (dispatch) => {
    const response = await axios.get(`/dogs?name=${id}`)
    if (response?.data) {
      dispatch({
        type: "DOGSID", payload: {dogs: response.data}
      })
    }
  }
}

export const Detailed = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/dogs/${id}`);
      if (response?.data) {
        dispatch({ type: "DETAILED", payload: { detis: response.data } });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// export const Post = (inputs) => {
//   return function (dispatch) {
//     fetch("/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(inputs),
//     }).then((resu) => console.log(resu));
//   };
// };

export const Post = function (inputs) {
  return function (dispatch) {
    return axios.post("/create", inputs).then((response) => {
      console.log(response);
    });
    //     dispatch({
    //         type: 'POST',
    //         payload: response.data
    //     })
    // })
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

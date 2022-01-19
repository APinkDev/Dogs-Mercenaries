const initialState = {
  DogsState: [],
  DBTemps: [],
  Details: [],
  Filtred: [],
  FiltredApi: [],
  FiltredAB: [],
  FiltredWeigh: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "DOGSALL": {
      state = initialState;
      return {
        ...state,
        DogsState: state.DogsState.concat(action.payload.dogs),
      };
    }
    case "SEARCHDOG": {
      state = initialState;
      return {
        ...state,
        DogsState: state.DogsState.concat(action.payload.dogs),
      };
    }

    case "GETTEMPS": {
      state.DBTemps = state.DBTemps.slice(0, state.DBTemps.length - 1);
      return {
        ...state,
        DBTemps: state.DBTemps.concat(action.payload.dogs),
      };
    }
    case "DOGSID": {
      state = initialState;
      return {
        ...state,
        DogsState: state.DogsState.concat(action.payload.dogs),
      };
    }
    case "DETAILED": {
      state = initialState;
      return {
        ...state,
        Details: action.payload.detis,
      };
    }
    
    //-----------------------------------------------------------------------------------------------
    case "FILTRATED": {
      function filterByTemp(elm, action) {
        for (let i = 0; i < action.length; i++) {
          if (elm.includes(action[i])) {
            return true;
          }
        }
      }
      var tempsfinale = []
      if (state.Filtred.length === 0) {
        tempsfinale = state.DogsState.filter((element) =>
          filterByTemp(element.temperament, action.payload)
        );
      }
      if (state.Filtred.length !== 0) {
        tempsfinale = state.Filtred.filter((element) =>
          filterByTemp(element.temperament, action.payload)
        );
      }
      return {
        ...state,

        Filtred: tempsfinale,
      };
    }

    case "FILTRATEDTYPE": {
      if (action.payload === "ALL") {
        state.Filtred = initialState;
        return {
          ...state,
          Filtred: state.DogsState,
        };
      }
      if (action.payload === "API" && state.Filtred.length === 0) {
        return {
          ...state,
          Filtred: state.DogsState.filter((a) => !Number.isNaN(Number(a.id))),
        };
      }
      if (action.payload === "API" && state.Filtred.length !== 0) {
        return {
          ...state,
          Filtred: [...state.Filtred].filter(
            (a) => !Number.isNaN(Number(a.id))
          ),
        };
      }
      if (action.payload === "DB" && state.Filtred.length === 0) {
        return {
          ...state,
          Filtred: state.DogsState.filter((a) => Number.isNaN(Number(a.id))),
        };
      }
      if (action.payload === "DB" && state.Filtred.length !== 0) {
        return {
          ...state,
          Filtred: [...state.Filtred].filter((a) => Number.isNaN(Number(a.id))),
        };
      }
      break;
    }

    case "AZBUTTOM": {

      if (action.payload === "") {
        state.Filtred = initialState;
        return {
          ...state,
          Filtred: state.DogsState,
        };
      }
      if (action.payload === "AZ" && state.Filtred.length === 0) {
        console.log("AZ");
        return {
          ...state,
          Filtred: [...state.DogsState].sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        };
      }
      if (action.payload === "AZ" && state.Filtred.length !== 0) {
        return {
          ...state,
          Filtred: [...state.Filtred].sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        };
      }
      if (action.payload === "ZA" && state.Filtred.length === 0) {
        return {
          ...state,
          Filtred: [...state.DogsState].sort((b, a) =>
            a.name.localeCompare(b.name)
          ),
        };
      }
      if (action.payload === "ZA" && state.Filtred.length !== 0) {
        return {
          ...state,
          Filtred: [...state.Filtred].sort((b, a) =>
            a.name.localeCompare(b.name)
          ),
        };
      }
      if (action.payload === "HighWeight" && state.Filtred.length === 0) {
        return {
          ...state,
          Filtred: [...state.DogsState].sort((a, b) =>
            parseInt(a.weight.substring(0, 2)) >
            parseInt(b.weight.substring(0, 2))
              ? 1
              : parseInt(b.weight.substring(0, 2)) >
                parseInt(a.weight.substring(0, 2))
              ? -1
              : 0
          ),
        };
      }
      if (action.payload === "HighWeight" && state.Filtred.length !== 0) {
        return {
          ...state,
          Filtred: [...state.Filtred].sort((a, b) =>
            parseInt(a.weight.substring(0, 2)) >
            parseInt(b.weight.substring(0, 2))
              ? 1
              : parseInt(b.weight.substring(0, 2)) >
                parseInt(a.weight.substring(0, 2))
              ? -1
              : 0
          ),
        };
      }
      if (action.payload === "LowWeight" && state.Filtred.length === 0) {
        return {
          ...state,
          Filtred: [...state.DogsState].sort((a, b) =>
            parseInt(a.weight.substring(0, 2)) <
            parseInt(b.weight.substring(0, 2))
              ? 1
              : parseInt(b.weight.substring(0, 2)) <
                parseInt(a.weight.substring(0, 2))
              ? -1
              : 0
          ),
        };
      }
      if (action.payload === "LowWeight" && state.Filtred.length !== 0) {
        return {
          ...state,
          Filtred: [...state.Filtred].sort((a, b) =>
            parseInt(a.weight.substring(0, 2)) <
            parseInt(b.weight.substring(0, 2))
              ? 1
              : parseInt(b.weight.substring(0, 2)) <
                parseInt(a.weight.substring(0, 2))
              ? -1
              : 0
          ),
        };
      }
      break;
    }

    default: {
      return state;
    }
  }
};

export default reducer;

import React, { useState, useEffect } from "react";
import "./Home.css";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import {
  DogsAll,
  SearchDog,
  GetTemps,
  FiltratedType,
  Filtrated,
  AZButtom,
} from "../Store/actions";
import { useSelector, useDispatch } from "react-redux";
import APIbuttom from "./APIbuttom";
import AZbuttom from "./AZbuttom";
import FiltredButton from "./FiltredButton";
import Pagination from "./Pagination";
import Dogs from "./Dogs";


export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(DogsAll());
  }, [dispatch]);

  const dogstate = useSelector((state) => state.DogsState);
  const filter = useSelector((state) => state.Filtred);

  dispatch(GetTemps());

  const [container, setContainer] = useState([]);


  const Search = (arg) => {
    arg === "" ? dispatch(DogsAll()) : dispatch(SearchDog(arg));
  };

  React.useEffect(() => {
    if (dogstate && filter.length === 0) {
      setContainer(dogstate);
    } else {
      setContainer(filter);
    }
  }, [filter, dogstate]);

  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  const indexOfLastPost = currentPage * dogsPerPage;
  const indexOfFirstPost = indexOfLastPost - dogsPerPage;
  const currentPost = container.slice(indexOfFirstPost, indexOfLastPost);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetFilter = () => {
    dispatch(DogsAll());
  }

  const Filtred = (arg) => {
    dispatch(Filtrated(arg));
    // console.log("existo");
  };

  const FilterType = (arg) => {
    // console.log("filtertype: ", filter, "dogstate:", dogstate);
    dispatch(FiltratedType(arg));
  };

  const Azbuttoms = (arg) => {
    dispatch(AZButtom(arg));
  };

  return (
    <div className="Home_Background">
      <button className="Home__Icon" onClick={resetFilter}>🐶</button>
      <div className="Home_Top">
        <div className="Home_search__title">
          <SearchBar search={Search} className="Home_search__search" />
          <Link to="/" className="Home__back">
            <h1>Dogs Mercenaries</h1>
          </Link>
        </div>

        <div className="Home_Right">
          <div className="Home_Right__Top">
            {/* <button type="button" className=""></button> */}
            <FiltredButton // GettingTemps={GettingTemps}
              Filtred={Filtred}
              className="Home_Right__filtred"
            />
            <AZbuttom Azbuttoms={Azbuttoms} className="Home_Right__az" />
            <APIbuttom
              FilterType={FilterType}
              className="Home_Right__type"
            ></APIbuttom>
            <Link to="/create" className="Home_Right__create">
              <h2 className="Home_Right__create__text">create</h2>
            </Link>
          </div>
        </div>

      </div>
      <div className="Home_all">
        <Dogs dogsInfo={currentPost} loading={loading} />
      </div>
      <div className="Home__paginate">
        <Pagination
          className="Home__pagination__li"
          dogsPerPage={dogsPerPage}
          totalDogs={container.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

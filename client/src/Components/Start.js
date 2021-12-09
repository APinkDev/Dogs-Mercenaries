import React from "react";
import { Link } from "react-router-dom";
import "./Start.css";

export const Start = () => {
  return (
    <div className="Background_Start">
      <div className="start__left">
        <div className="start__p">
          <p className="Text__Warning">
            Did you know that dogs are better than humans?<br></br>
            Here are some examples:<br></br>
            Dogs are the most trustworthy confidants. <br></br>
            They’ll never blab your secrets.<br></br>
            They’ll never make you feel inadequate. <br></br>
            They’re always happy to see you. <br></br>
            Dogs don’t care if you forget to shower, they may actually prefer it.<br></br> 
            They don’t talk back. They’ll happily clean up your messes while cooking.<br></br> 
            Dogs aren’t cats.<br></br> 
            They can cheer us up when we need it the most. <br></br>
            Dogs explored space before us. <br></br>
            Dogs don’t make you feel guilty for canceling plans. <br></br>
            Dogs are easier to train than people. <br></br>
            Petting dogs decreases stress, petting people may increase stress. <br></br>
            Dogs are furry therapists that don’t charge. <br></br>
            Dogs will always agree with your movie choices. <br></br>
            Your dog loves your dance moves. <br></br>
            Dogs start as puppies, and everyone loves puppies. <br></br>
            His salary is incredibly low. such economic! <br></br>
            In fact, recruiting a dog is much better than recruiting a human!!!<br></br>
          </p>
        </div>
      </div>
      <div className="start__right">
        <div className="start__title">
          <h1 className="start__title__title">Dogs mercenaries</h1>
        </div>
        <div className="start__start">
          <Link to="/Home" >
            <h1 className="start__start__butom">🐶</h1>
          </Link>
        </div>
        <div className="start__text">
          <h2 classname="start__text__text">Here we are some dog recluits! </h2>
        </div>
      </div>
    </div>
  );
};

export default Start;

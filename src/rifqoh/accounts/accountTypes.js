import React, {useEffect} from "react";

import { Link } from "react-router-dom";
import Nav from "../navTypes/nav";
import Progress from "react-progress-2";

function accountTypes() {
  useEffect(() => {
    Progress.hide()
  })
  return (
    <div>
      <Nav />
      <div className="container-fluid">
        <div className="row intro">
          <div class="col-lg-6 col-sm-12 left">
            <div className="container text-center">
              <h2 className="font-weight-light">
                Gobird helps you find products to try.
              </h2>
              <br />
              <Link
                to={{ pathname: "/signup", is_commerce: false }}
                className="btn btn-lg btn-light shadow"
              >
                Create a personal account
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 right">
            <div className="container text-center">
              <h2 className="font-weight-light">
                Gobird help you reach more customers.
              </h2>
              <br />
              <Link
                to={{ pathname: "/signup", is_commerce: true }}
                className="btn btn-lg btn-success shadow"
              >
                Create a commerce account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default accountTypes;

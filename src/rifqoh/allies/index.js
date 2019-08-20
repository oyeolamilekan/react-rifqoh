import React, { useEffect, useState } from "react";

import axios from "axios";
import { url } from "inspector";

function index() {
  const [allies, setallies] = useState([]);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${Token()}`
  };
  getAllies = () => {
    axios
      .get(`${url}/api/get_allies_obj/`, { headers: headers })
      .then(res => {
          setallies(res.data);
      });
  };
  useEffect(() => {
      getAllies();
  });
  return <div />;
}

export default index;

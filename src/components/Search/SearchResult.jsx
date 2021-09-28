import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { searchUsersList } from "../../api/UserApi/userApi";
import axios from "axios";

const SearchResult = () => {
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const { name } = queryString.parse(window.location.search);
    console.log("-----Seach Query string Information----");
    console.table({ name });

    searchUsersList({ name }).then((data) => {
      console.log("--Listing SearchUsers Results---");
      console.log(data);
    });
  }, []);
  return (
    <div>
      <h1>Users</h1>
    </div>
  );
};

export default SearchResult;

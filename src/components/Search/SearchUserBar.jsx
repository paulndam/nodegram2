import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import SearchBar from "material-ui-search-bar";
import Button from "@material-ui/core/Button";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(3),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchUserBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const handleClickSearch = () => {
    console.log(`name in search query string ---> ${name}`);
    history.push(`/search-results?name=${name}`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <Button
        variant="contained"
        color="#ffc107"
        className={classes.button}
        startIcon={<SearchIcon />}
        onClick={handleClickSearch}
      >
        Search
      </Button>
      {/* <SearchBar
        id="search"
        placeholder="search location"
        labelText="Address..."
        name="location"
        value={name}
        hintText="Search by name "
        style={{
          margin: "0 auto",
          maxWidth: 400,
        }}
        onChange={(value) => setName(value)}
      /> */}
      {/* <SearchBar
                id="search"
                placeholder="search location"
                labelText="Address..."
                name="location"
                value={email}
                hintText="Search City"
                style={{
                  margin: "0 auto",
                  maxWidth: 400,
                }}/> */}
    </div>
  );
};

export default SearchUserBar;

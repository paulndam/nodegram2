import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listAllUsers } from "../../api/UserApi/userApi";
import MenuBar from "../Menu/MenuBar";
import Typography from "@material-ui/core/Typography";
import ListUser from "./ListUser";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Footer from "../Footer/Footer";
import LoadingSpinner from "../../pages/Spinner/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16) || "100%",
      maxWidth: 500,
      height: theme.spacing(16),
    },
  },
  root2: {
    width: "100%",
    // color: "#FFFFFF",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
    // color: "#FFFFFF",
  },

  texthead: {
    ...theme.typography.button,
    //backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    alignContent: "center",
    background: "white",
    textAlign: "center",
  },
}));

const User = (props) => {
  const classes = useStyles();
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   //setLoading(true);
  //   listAllUsers().then((res) => {
  //     console.log(res);
  //     //   setUser({ users: data });
  //     //setLoading(false);
  //     // setUser(res.data);
  //   });
  // }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setLoading(true);

    listAllUsers(signal).then((data) => {
      console.log(data);
      if (data && data.error) {
        console.log(data.error);
      } else {
        setLoading(false);
        setUser(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <MenuBar />
      <div>
        <Paper elevation={4} variant="outlined">
          <div className={classes.texthead}>{"All Users"}</div>;
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {users.map(({ id, ...otherProps }) => (
                <ListUser key={id} {...otherProps} />
              ))}
            </>
          )}
        </Paper>
      </div>
      <Footer />
    </div>
  );
};

export default User;

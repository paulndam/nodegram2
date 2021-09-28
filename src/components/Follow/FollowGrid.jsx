import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import propTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    background: theme.palette.background.paper,
  },
  root2: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  gridList: {
    width: 500,
    height: 220,
  },
  tileText: {
    textAlign: "center",
    underline: "none",
    marginTop: 10,
    cursor: "pointer",
  },
  button: {
    margin: theme.spacing(3),
  },
  textDec: {
    textDecoration: "none",
  },
}));

/*
The FollowGrid component will take a list of users as props, display the avatars of the users with their names, and link to each user's profile. We can add this component as desired to the Profile view to display followings or followers.
*/

const FollowGrid = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={4}>
        {props.people.map((person, i) => {
          return (
            <GridListTile style={{ height: 120 }} key={i}>
              <Link to={`/user/${person._id}`} className={classes.textDec}>
                <Avatar
                  src={`${process.env.REACT_APP_API}/api/users/photo/${person._id}`}
                  //   src={"/api/users/photo/" + person._id}
                  className={classes.bigAvatar}
                />
                <Typography
                  className={classes.tileText}
                  style={{ color: "#333" }}
                >
                  {person.name}
                </Typography>
              </Link>
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
};

FollowGrid.propTypes = {
  people: propTypes.array.isRequired,
};

export default FollowGrid;

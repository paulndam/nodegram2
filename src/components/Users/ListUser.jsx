import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import DefaultPic from "../../assets/images/crazyfrog.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const ListUser = ({ name, email, _id, following, followers, photo, about }) => {
  const classes = useStyles();
  // user/:userId
  const photoUrl =
    _id &&
    `${
      process.env.REACT_APP_API
    }/api/users/photo/${_id}?${new Date().getTime()}`;
  // : `${DefaultPic}`;

  return (
    <div>
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <Link to={`/user/${_id}`}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={photoUrl} />
            </ListItemAvatar>
          </Link>
          <ListItemText
            primary={`Followers: ${followers.length}`}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {`Name: ${name}`}
                </Typography>
                <br />
                {`Email: ${email}`}
                <br />
                {`Following: ${following.length}`}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </div>
  );
};
export default ListUser;

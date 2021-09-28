import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { follow, unfollow } from "../../api/UserApi/userApi";

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
}));

const FollowButtons = (props) => {
  const classes = useStyles();

  const followClick = () => {
    props.onButtonClick(follow);
  };
  const unfollowClick = () => {
    props.onButtonClick(unfollow);
  };
  return (
    <div>
      {props.following ? (
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={unfollowClick}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={followClick}
        >
          Follow
        </Button>
      )}
    </div>
  );
};
FollowButtons.propTypes = {
  following: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
export default FollowButtons;

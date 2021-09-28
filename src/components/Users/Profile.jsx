import Paper from "@material-ui/core/Paper";
import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { read, follow } from "../../api/UserApi/userApi";
import auth from "../../utils/Auth/authHelper";
import MenuBar from "../Menu/MenuBar";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import Person from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import DeleteUser from "./DeleteUser";
import Footer from "../Footer/Footer";
import FollowButtons from "../Follow/FollowButtons";
import ProfileTab from "./ProfileTab";
import { listByUser } from "../../api/PostApi/postApi";
import LoadingSpinner from "../../pages/Spinner/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle,
  },
  textDec: {
    textDecoration: "none",
  },
}));

const Profile = ({ match }) => {
  // This profile information can be fetched from the server only if the user is signed in, and to verify this, the component has to provide the JWT to the read fetch call, otherwise, the user should be redirected to the Sign In view.
  const classes = useStyles();
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  //const [redirectToSignIn, setRedirectToSignIn] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);
    read(
      {
        userId: match.params.userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      console.log("--- Data In UseEffect ---");
      console.log(data);
      if (data && data.error) {
        setValues({ ...values, redirectToSignin: true });
      } else {
        setLoading(false);
        let following = checkFollow(data);
        console.log("-----Checking following in UseEffect----");
        console.log(following);
        setValues({ ...values, user: data, following: following });
        loadPosts(data._id);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  /*
  the checkFollow method will check if the signed-in user exists in the fetched user's followers list, then return the match if found, otherwise return undefined if a match is not found.
  */

  const checkFollow = (user) => {
    const match = user.followers.some((follower) => {
      return follower._id === jwt.user._id;
    });
    console.log("---- match ---");
    console.log(match);
    return match;
  };

  const clickFollowButton = (callApi) => {
    const jwt = auth.isAuthenticated();
    console.log("--- JWT From ClickFollow button in Profile ---");
    console.log(jwt);
    callApi({ userId: jwt.user._id }, { t: jwt.token }, values.user._id).then(
      (data) => {
        console.log("---Data From ClickFollowButton in Profile Component ----");
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error });
          console.log(data.error);
        } else {
          setValues({ ...values, user: data, following: !values.following });
        }
      }
    );
  };

  // this method will fetch the api that will load all the post of a unique user. we will make use of the listByUser api call method .

  const loadPosts = (user) => {
    setLoading(true);
    listByUser({ userId: user }, { t: jwt.token }).then((data) => {
      console.log("-- post of a unique user in their profile --");
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setLoading(false);
        setPosts(data);
      }
    });
  };

  // removing post as well.
  const removePost = (post) => {
    const updatedPosts = posts;
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  const photoUrl =
    values.user._id &&
    `${process.env.REACT_APP_API}/api/users/photo/${
      values.user._id
    }?${new Date().getTime()}`;

  if (values.redirectToSignIn) {
    return <Redirect to="/signin" />;
  }

  return (
    <div>
      <MenuBar />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Paper className={classes.root} elevation={4}>
          <Typography variant="h6" className={classes.title}>
            {values.user.followers.length === 1
              ? `${values.user.followers.length} Follower`
              : `${values.user.followers.length} Followers`}
          </Typography>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={photoUrl}>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={values.user.name}
                secondary={values.user.email}
              />{" "}
              <br />
              {auth.isAuthenticated().user &&
              auth.isAuthenticated().user._id === values.user._id ? (
                <ListItemSecondaryAction>
                  <Link
                    to={`/user/edit/${values.user._id}`}
                    className={classes.textDec}
                  >
                    <IconButton aria-label="Edit" color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                  <DeleteUser userId={values.user._id} />
                </ListItemSecondaryAction>
              ) : (
                <FollowButtons
                  following={values.following}
                  onButtonClick={clickFollowButton}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={`About: ${
                  values.user.about === "undefined" ? "🤠" : values.user.about
                }`}
              ></ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  "Joined: " + new Date(values.user?.created).toDateString()
                }
              />
            </ListItem>
          </List>
          <ProfileTab
            user={values.user}
            posts={posts}
            removePostUpdate={removePost}
          />
        </Paper>
      )}
      <Footer />
    </div>
  );
};

export default Profile;

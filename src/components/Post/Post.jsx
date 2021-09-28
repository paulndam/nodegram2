import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import auth from "../../utils/Auth/authHelper";
import { remove, like, unlike } from "../../api/PostApi/postApi";
import Comments from "../Comments/Comments";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing(3),
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  cardContent: {
    backgroundColor: "white",
    padding: `${theme.spacing(2)}px 0px`,
  },
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(2),
  },
  photo: {
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(1),
  },
  media: {
    //height: 200,
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Post = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const jwt = auth.isAuthenticated();
  const checkLike = (likes) => {
    let match = likes.indexOf(jwt.user._id) !== -1;
    return match;
  };
  const [values, setValues] = useState({
    like: checkLike(props.post.likes),
    likes: props.post.likes.length,
    comments: props.post.comments,
  });

  const clickLike = () => {
    let callApi = values.like ? unlike : like;
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      props.post._id
    ).then((data) => {
      console.log("-- Checking Unliking data ");
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, like: !values.like, likes: data.likes.length });
      }
    });
  };

  const updateComments = (comments) => {
    setValues({ ...values, comments: comments });
  };

  const deletePost = () => {
    remove({ postId: props.post._id }, { t: jwt.token }).then((data) => {
      console.log("--- deleting data post in delete post method --");
      console.log(data);

      if (data.error) {
        console.log(data.error);
      } else {
        props.onRemove(props.post);
      }
    });
  };

  return (
    <div>
      <Card className={classes.card} style={{ backgroundColor: "#eeeeee" }}>
        <CardHeader
          style={{ backgroundColor: "#F6F6F6" }}
          avatar={
            <Avatar
              src={`${process.env.REACT_APP_API}/api/users/photo/${props.post.postedBy._id}`}
            />
          }
          action={
            props.post.postedBy._id === auth.isAuthenticated().user._id && (
              <IconButton onClick={deletePost} color="secondary">
                <DeleteForeverIcon />
              </IconButton>
            )
          }
          title={
            <Button
              variant="contained"
              color="#fff"
              className={classes.button}
              onClick={() => history.push(`/user/${props.post.postedBy._id}`)}
            >
              {/* <Link to={`/user/${props.post.postedBy._id}`} underline={"none"}>
                {props.post.postedBy.name}
              </Link> */}
              {props.post.postedBy.name}
            </Button>
          }
          subheader={new Date(props.post.created).toDateString()}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <Typography component="p" className={classes.text}>
            {props.post.text}
          </Typography>
          {props.post.photo && (
            <div className={classes.photo}>
              <img
                className={classes.media}
                src={`${process.env.REACT_APP_API}/api/posts/photo/${props.post._id}`}
                alt="pict"
              />
            </div>
          )}
        </CardContent>
        <CardActions>
          {values.like ? (
            <IconButton
              onClick={clickLike}
              className={classes.button}
              aria-label="Like"
              color="secondary"
            >
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={clickLike}
              className={classes.button}
              aria-label="Unlike"
              color="secondary"
            >
              <FavoriteBorderIcon />
            </IconButton>
          )}{" "}
          <span>{values.likes}</span>
          <IconButton
            className={classes.button}
            aria-label="Comment"
            //color="secondary"
          >
            <CommentIcon />
          </IconButton>{" "}
          <span>{values.comments.length}</span>
        </CardActions>
        <Divider />
        <Comments
          postId={props.post._id}
          comments={values.comments}
          updateComments={updateComments}
        />
      </Card>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Post;

import React, { useState } from "react";
import auth from "../../utils/Auth/authHelper";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { comment, unComment } from "../../api/PostApi/postApi";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import useStyles from "./styles";

const Comments = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const jwt = auth.isAuthenticated();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const addComment = async (e) => {
    if (e.keyCode === 13 && e.target.value) {
      e.preventDefault();

      const data = await comment(
        { userId: jwt.user._id },
        { t: jwt.token },
        props.postId,
        {
          text: text,
        }
      );

      console.log("--- Comment data ---");
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setText("");
        props.updateComments(data.comments);
      }
    }
  };

  const deleteComment = (comment) => (e) => {
    unComment(
      { userId: jwt.user._id },
      { t: jwt.token },
      props.postId,
      comment
    ).then((data) => {
      console.log("--- delete Comment data --- ");
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        props.updateComments(data.comments);
      }
    });
  };

  const commentBody = (item) => {
    return (
      <p className={classes.commentText}>
        <Link to={`/user/${item.postedBy._id}`} className={classes.textDec}>
          {item.postedBy.name}
        </Link>
        <br />
        {item.text}
        <span className={classes.commentDate}>
          {new Date(item.created).toDateString()} |
          {auth.isAuthenticated().user._id === item.postedBy._id && (
            <DeleteForeverIcon
              onClick={deleteComment(item)}
              className={classes.commentDelete}
              color="secondary"
            >
              Delete
            </DeleteForeverIcon>
          )}
        </span>
      </p>
    );
  };

  return (
    <div>
      <CardHeader
        avatar={
          <Avatar
            className={classes.smallAvatar}
            src={`${process.env.REACT_APP_API}/api/users/photo/${
              auth.isAuthenticated().user._id
            }`}
          />
        }
        title={
          <TextField
            onKeyDown={addComment}
            multiline
            value={text}
            onChange={handleChange}
            placeholder="Write something ..."
            className={classes.commentField}
            margin="normal"
          />
        }
        className={classes.cardHeader}
      />
      {props.comments.map((item, i) => {
        return (
          <CardHeader
            avatar={
              <Avatar
                className={classes.smallAvatar}
                src={`${process.env.REACT_APP_API}/api/users/photo/${item.postedBy._id}`}
              />
            }
            title={commentBody(item)}
            className={classes.cardHeader}
            key={i}
          />
        );
      })}
    </div>
  );
};

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  updateComments: PropTypes.func.isRequired,
};

export default Comments;

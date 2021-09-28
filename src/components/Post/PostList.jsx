import React, { useState, useEffect } from "react";
import auth from "../../utils/Auth/authHelper";
import { listNewsFeed } from "../../api/PostApi/postApi";
import PropTypes from "prop-types";
import Post from "./Post";
import LoadingSpinner from "../../pages/Spinner/LoadingSpinner";

const PostList = (props) => {
  // const [listItem, setListItem] = useState(
  //   Array.from(Array(5).keys(), (n) => (n = +1))
  // );
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop !==
  //     document.documentElement.offsetHeight
  //   )
  //     return;
  //   //setLoading(true);
  // };

  // useEffect(() => {
  //   if (!loading) return;

  // },[]);

  return (
    <div style={{ marginTop: "24px" }}>
      {/* {loading ? (
        <LoadingSpinner />
      ) : (
        props.posts.map((item, i) => {
          return <Post post={item} key={i} onRemove={props.removeUpdate} />;
        })
      )} */}
      {props.posts.map((item, i) => {
        return <Post post={item} key={i} onRemove={props.removeUpdate} />;
      })}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired,
};

export default PostList;

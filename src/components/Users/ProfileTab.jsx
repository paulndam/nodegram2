import React, { useState } from "react";
import propTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FollowGrid from "../Follow/FollowGrid";
import { makeStyles } from "@material-ui/core/styles";
import PostList from "../Post/PostList";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const ProfileTab = (props) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  const handleTabChage = (e, value) => {
    setTab(value);
  };
  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleTabChage}
          indicatorColor="primary"
          textColor="primary"
          variant="fullwidth"
        >
          <Tab label="Posts" />
          <Tab label="Following" />
          <Tab label="Followers" />
        </Tabs>
      </AppBar>

      {tab === 0 && (
        <TabContainer>
          <PostList removeUpdate={props.removePostUpdate} posts={props.posts} />
        </TabContainer>
      )}

      {tab === 1 && (
        <TabContainer>
          <FollowGrid people={props.user.following} />
        </TabContainer>
      )}

      {tab === 2 && (
        <TabContainer>
          <FollowGrid people={props.user.followers} />
        </TabContainer>
      )}
    </div>
  );
};

ProfileTab.propTypes = {
  user: propTypes.object.isRequired,
  removePostUpdate: propTypes.func.isRequired,
  posts: propTypes.array.isRequired,
};

export default ProfileTab;

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: propTypes.node.isRequired,
};

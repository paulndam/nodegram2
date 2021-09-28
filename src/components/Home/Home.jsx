import React, { useState, useEffect } from "react";
import auth from "../../utils/Auth/authHelper";
import MenuBar from "../Menu/MenuBar";
import MapUserCard from "../MapUserCard/MapUserCard";
import Footer from "../Footer/Footer";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FindPeople from "../FindPeople/FindPeople";
import NewsFeed from "../Post/NewsFeed";
import PostList from "../Post/PostList";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //display: "flex",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
    background: "red",
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.text.secondary,
  },
  media: {
    //minHeight: 400,
    height: 0,
    paddingTop: "56.25%",
  },
  credit: {
    padding: 10,
    textAlign: "right",
    backgroundColor: "#ededed",
    borderBottom: "1px solid #d0d0d0",
    "& a": {
      color: "#3f4771",
    },
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://cdn.hipwallpaper.com/i/0/88/OvfDhg.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100%",
  },
  secondaryFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage:
      "url(https://cff2.earth.com/uploads/2021/02/26123317/shutterstock_13306689503-1-scaled.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  cover: {
    width: 151,
  },
  avatar: {
    backgroundColor: red[500],
  },
  typoText: {
    ...theme.typography.button,
    //backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    alignContent: "center",
    background: "#c2185b",
    textAlign: "center",
    color: "white",
  },
}));

const Home = ({ history }) => {
  const classes = useStyles();
  const [defaultPage, setDefaultPage] = useState(false);

  useEffect(() => {
    setDefaultPage(auth.isAuthenticated());
    const unlisten = history.listen(() => {
      setDefaultPage(auth.isAuthenticated());
    });
    return () => unlisten();
  }, []);

  return (
    <div className={classes.root}>
      {!defaultPage && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <MenuBar />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              className={classes.mainFeaturedPost}
              // style={{
              //   backgroundImage: `url(https://bs-uploads.toptal.io/blackfish-uploads/blog/post/seo/og_image_file/og_image/15921/secure-rest-api-in-nodejs-18f43b3033c239da5d2525cfd9fdc98f.png)`,
              // }}
            >
              {/* Increase the priority of the hero background image */}
              {
                <img
                  style={{ display: "none", height: "100%" }}
                  src={"https://cdn.hipwallpaper.com/i/0/88/OvfDhg.jpg"}
                  alt={"imageTextP"}
                />
              }
              <div className={classes.overlay} />
              <Grid container>
                <Grid item md={6}>
                  <div className={classes.mainFeaturedPostContent}>
                    <Typography
                      component="h1"
                      variant="h3"
                      color="inherit"
                      gutterBottom
                    >
                      Let's socialize in Node-Gram
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                      A social community network, designed, architectured and
                      build with Nodejs and Javascript advancded feautures.
                      Ofcourse, don't forget Reactjs in the play as well, for a
                      smooth and fun social communication platform.
                    </Typography>
                    <Link variant="subtitle1" href="" color="#e91e63">
                      check it out
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <CardActionArea component="a" href="#">
              <Card className={classes.card}>
                <div className={classes.cardDetails}>
                  <CardContent>
                    <div className={classes.typoText}>{"Make a post"}</div>
                    <Typography variant="subtitle1" color="textSecondary">
                      {new Date().toDateString()}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {
                        "Share your extra-ordinary thought,ideas and moments with your followers"
                      }
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      See all users and check out their profiles. Follow a list
                      of users you prefer and unfollow as many as you may want.
                    </Typography>
                  </CardContent>
                </div>
                <Hidden xsDown>
                  <CardMedia
                    className={classes.cover}
                    image={require("../../assets/images/car1.jpeg")}
                    title={"All under your control"}
                  />
                </Hidden>
              </Card>
            </CardActionArea>
          </Grid>

          <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="#">
              <Card className={classes.card}>
                <div className={classes.cardDetails}>
                  <CardContent>
                    <div className={classes.typoText}>
                      {"Default User Access"}
                    </div>
                    <Typography variant="subtitle1" color="textSecondary">
                      {new Date().toDateString()}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      Email: node@gmail.com
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      Password:123456
                    </Typography>

                    <Typography variant="subtitle1" paragraph color="primary">
                      Use the credentials above to get started quickly. Or you
                      can create your own unique account, just sign-up.
                    </Typography>
                  </CardContent>
                </div>
                <Hidden xsDown>
                  <CardMedia
                    style={{ height: "100%" }}
                    className={classes.cardMedia}
                    image={
                      "https://images.pexels.com/photos/1542252/pexels-photo-1542252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    }
                    title={"All under your control"}
                  />
                </Hidden>
              </Card>
            </CardActionArea>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Roberto Carlos"
                subheader="September 14, 2016"
              />
              <CardMedia
                className={classes.media}
                image={require("../../assets/images/car1.jpeg").default}
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Guys, check out my new Mercedes Benz AMG GT Coupe. It's fast ,
                  smooth and comfortable.The all new 2020 is in my drive way
                  ❤️❤️🎊
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    F
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Food Guy"
                subheader="September 14, 2016"
              />
              <CardMedia
                className={classes.media}
                image={require("../../assets/images/burger1.jpeg").default}
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Nice juicy, burger. How many of this can you eat 🤔 ?.I can
                  eat 20 🤣 🤣. Share your thoughts in the comments.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper className={classes.secondaryFeaturedPost}>
              {
                <img
                  style={{ display: "none", height: "100%" }}
                  src={
                    "https://cff2.earth.com/uploads/2021/02/26123317/shutterstock_13306689503-1-scaled.jpg"
                  }
                  alt={"imageTextP"}
                />
              }
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Footer />
            </Paper>
          </Grid>
        </Grid>
      )}

      {defaultPage && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <MenuBar />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              style={{ backgroundColor: "#000000" }}
              className={classes.paper}
            >
              <NewsFeed />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper
              style={{ backgroundColor: "#000000" }}
              className={classes.paper}
            >
              <FindPeople />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Footer />
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Home;

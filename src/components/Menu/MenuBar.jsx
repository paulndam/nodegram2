import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import GroupIcon from "@material-ui/icons/Group";
import CenterFocusStrongIcon from "@material-ui/icons/CenterFocusStrong";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import auth from "../../utils/Auth/authHelper";
import SearchUserBar from "../Search/SearchUserBar";
import Avatar from "@material-ui/core/Avatar";

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
  avt: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const MenuBar = ({ history }) => {
  const classes = useStyles();
  //   const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#ff4081" };
    } else {
      return { color: "#ffffff" };
    }
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box p={1} m={1}>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <HomeIcon onClick={() => history.push("/")} />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Node-Gram
              </Typography>
              {/* <SearchUserBar /> */}
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<GroupIcon />}
                  onClick={() => history.push(`/user-list`)}
                >
                  Users
                </Button>

                {!auth.isAuthenticated() && (
                  <>
                    <Button
                      variant="contained"
                      color="#ffc107"
                      className={classes.button}
                      startIcon={<CenterFocusStrongIcon />}
                      onClick={() => history.push(`/signup`)}
                    >
                      SIGN-UP
                    </Button>

                    <Button
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<ExitToAppIcon />}
                      onClick={() => history.push(`/signin`)}
                    >
                      SIGN-IN
                    </Button>
                  </>
                )}

                {auth.isAuthenticated() && (
                  <>
                    <Button
                      variant="contained"
                      color="#ffc107"
                      className={classes.button}
                      startIcon={<CenterFocusStrongIcon />}
                      onClick={() => history.push(`/`)}
                    >
                      FEEDS
                    </Button>

                    <Button
                      variant="contained"
                      color="#ffc107"
                      className={classes.button}
                      startIcon={<CenterFocusStrongIcon />}
                      onClick={() =>
                        history.push(`/user/${auth.isAuthenticated().user._id}`)
                      }
                    >
                      Profile
                    </Button>

                    <Button
                      variant="contained"
                      color="#ffc107"
                      className={classes.button}
                      startIcon={<CenterFocusStrongIcon />}
                      onClick={() => {
                        auth.clearJWT(() => history.push("/"));
                      }}
                    >
                      SIGNOUT
                    </Button>
                  </>
                )}
              </div>

              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {auth.isAuthenticated() && (
                    <Avatar
                      alt="remy sharp"
                      src={`${process.env.REACT_APP_API}/api/users/photo/${
                        auth.isAuthenticated().user._id
                      }`}
                    />
                  )}
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() =>
                      history.push(`/user/${auth.isAuthenticated().user._id}`)
                    }
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      history.push(`/user/${auth.isAuthenticated().user._id}`)
                    }
                  >
                    My account
                  </MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </Box>
    </div>
  );
};

export default withRouter(MenuBar);

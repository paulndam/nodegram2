import React from "react";
import MenuBar from "../../components/Menu/MenuBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Made with ❤️ for a better Web
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div>
      <MenuBar />
      <div className={classes.root}>
        <CssBaseline />
        <Container component="main" className={classes.main} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {"404."}{" "}
            {
              "Sorry , The Page you are looking for is Non-Existent or maybe under maintenance "
            }
          </Typography>
          <Typography variant="body1">
            <Link href="/">Navigate Back To Home Page.</Link>
          </Typography>
        </Container>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body1">Paul Ndam.</Typography>
            <Copyright />
          </Container>
        </footer>
      </div>
    </div>
  );
};

export default NotFound;

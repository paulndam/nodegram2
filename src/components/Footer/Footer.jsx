import React from "react";
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
    minHeight: "20vh",
    background: "red",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    //marginBottom: "200px",
    color: "white",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div>
      <div>
        <CssBaseline />
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

export default Footer;

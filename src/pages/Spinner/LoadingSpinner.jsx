import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    flexGrow: 1,
    display: "flex",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: "white",
    height: "100%",
    width: "100%",
  },
}));

const LoadingSpinner = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item xs={12} container spacing={3}>
        <Paper className={classes.paper}>
          Fetching Data, Please Be Patient....
          <LinearProgress />
          <LinearProgress color="secondary" />
        </Paper>
      </Grid>
    </div>
  );
};

export default LoadingSpinner;

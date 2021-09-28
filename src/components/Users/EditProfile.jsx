import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { read, update } from "../../api/UserApi/userApi";
import auth from "../../utils/Auth/authHelper";
import MenuBar from "../Menu/MenuBar";
import Footer from "../Footer/Footer";
import DefaultPic from "../../assets/images/crazyfrog.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    width: 60,
    height: 60,
    margin: "auto",
  },
  input: {
    display: "none",
  },
  filename: {
    marginLeft: "10px",
  },

  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
  },
  error: {
    verticalAlign: "middle",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

const EditProfile = ({ match }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    email: "",
    about: "",
    photo: "",
    password: "",
    open: false,
    error: "",
    id: "",
    redirectToProfile: false,
  });

  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      (data) => {
        console.log("=== Data Updating ===");
        console.log(data);
        if (data && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            id: data._id,
            name: data.name,
            email: data.email,
            about: data.about,
          });
        }
      }
    );
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  const handleSubmit = () => {
    let userData = new FormData();
    values.name && userData.append("name", values.name);
    values.email && userData.append("email", values.email);
    values.passoword && userData.append("passoword", values.passoword);
    values.about && userData.append("about", values.about);
    values.photo && userData.append("photo", values.photo);
    update(
      {
        userId: match.params.userId,
      },
      {
        t: jwt.token,
      },
      userData
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, redirectToProfile: true });
      }
    });
  };

  /*
  Then on submit, userData is sent with the fetch API call to update the user. As the content type of the data sent to the server is no longer 'application/json', we also need to modify the update fetch method in userApi.js to remove Content-Type from the headers in the fetch call.

  */

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    setValues({ ...values, [name]: value });
  };

  const photoUrl = values.id
    ? `${process.env.REACT_APP_API}/api/users/photo/${
        values.id
      }?${new Date().getTime()} `
    : `${DefaultPic}`;

  if (values.redirectToProfile) {
    return <Redirect to={`/user/${values.id}`} />;
  }

  return (
    <div>
      <MenuBar />
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Edit Profile 🤓
          </Typography>
          <Avatar src={photoUrl} className={classes.bigAvatar} />
          <br />
          <input
            accept="image/*"
            onChange={handleChange("photo")}
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="default" component="span">
              Upload
              <FileUpload />
            </Button>
          </label>{" "}
          <span className={classes.filename}>
            {values.photo ? values.photo.name : ""}
          </span>
          <br />
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <br />
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <TextField
            id="multiline-flexible"
            type="text"
            label="About"
            rows="2"
            multiline
            className={classes.textField}
            value={values.about}
            onChange={handleChange("about")}
            margin="normal"
          />
          <br />
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
          />
          <br />{" "}
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>

        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Footer />
    </div>
  );
};

export default EditProfile;

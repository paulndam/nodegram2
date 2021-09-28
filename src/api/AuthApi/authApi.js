import axios from "axios";

const signin = async (user) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_API}/api/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// const signin = async (user) => {
//   return await axios.post(`${process.env.REACT_APP_API}/api/auth/signin`, {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     credentails: "include",
//     body: JSON.stringify(user),
//   });
// };

const signout = async () => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API}/api/auth/signout`,
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// const signout = async () => {
//   return await axios.get(`${process.env.REACT_APP_API}/api/auth/signout`);
// };

export { signin, signout };

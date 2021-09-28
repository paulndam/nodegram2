import axios from "axios";

const createUser = async (user) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_API}/api/users/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// const listAllUsers = async () => {
//   return await axios.get(`${process.env.REACT_APP_API}/api/users/`);
// };

const listAllUsers = async (signal) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_API}/api/users`, {
      method: "GET",
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log("cannot fetch all users");
    console.log(err);
  }
};

const read = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API}/api/users/${params.userId}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
    console.log("==== Response From Read in User-Api ===", response);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (params, credentials, user) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API}/api/users/${params.userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        body: user,
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API}/api/users/${params.userId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const follow = async (params, credentials, followId) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API}/api/users/follow`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.t}`,
        },
        body: JSON.stringify({ userId: params.userId, followId: followId }),
      }
    );
    console.log("====== Follow Response =====");
    console.log(response);
    return await response.json();
  } catch (err) {
    console.log(err);
    console.log("FAIL FAIL FAIL FAIL FAIL TO FOLLOW");
  }
};

const unfollow = async (params, credentials, unfollowId) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API}/api/users/unfollow`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        body: JSON.stringify({ userId: params.userId, unfollowId }),
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const findPeople = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API}/api/users/findpeople/${params.userId}`,
      {
        method: "GET",
        signal: signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const searchUsersList = async (query) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/api/users/search-users`,
    {
      query,
    }
  );
};

export {
  createUser,
  listAllUsers,
  read,
  update,
  remove,
  follow,
  unfollow,
  findPeople,
  searchUsersList,
};

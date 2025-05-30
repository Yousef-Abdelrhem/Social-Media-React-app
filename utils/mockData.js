import axios from "axios";

export async function fetchUsers() {
  try {
    const { data } = await axios.get("http://localhost:4000/users");
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchPosts() {
  try {
    const { data } = await axios.get("http://localhost:4000/posts");
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
// Add a single new user
export async function addNewUser(newUser) {
  try {
    const res = await axios.post("http://localhost:4000/users", newUser);
    console.log("User added:", res.data);
    return res.data;
  } catch (e) {
    console.error("Error adding user:", e);
    throw e;
  }
}

export async function getUser(email) {
  try {
    const res = await axios.get("http://localhost:4000/users");
    const user = res.data.find((itm) => email == itm.email);
    console.log(user);
    return user;
  } catch (e) {
    console.error("user not found", e);
    throw e;
  }
}

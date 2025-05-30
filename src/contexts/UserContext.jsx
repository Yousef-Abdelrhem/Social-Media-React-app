import React, { createContext, useContext, useEffect, useState } from "react";
import SignUp from "../components/SignUp";
import NavBar from "../components/NavBar";
import {
  fetchUsers,
  fetchPosts,
  addNewUser,
  getUser,
} from "../../utils/mockData";
import axios from "axios";
import { set } from "react-hook-form";

// while creating context null is default value!!!
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  async function handleUpdateUser(newUserData) {
    console.log(newUserData);
    const res = await addNewUser({ ...newUserData, id: users.length + 1 });
    setUsers((prevUsers) => [...prevUsers, res]);
  }

  //  to generate users and posts fast
  async function loadData() {
    try {
      const users = await fetchUsers();
      const posts = await fetchPosts();
      setUsers(users);
      setPosts(posts);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    loadData();
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
    }
  }, []);

  // logout function
  function logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("currentUser");
    setCurrentUser(null);
  }
  // update user
  function handleCurrentUser(email) {
    const user = users.find((itm) => itm.email == email);
    setCurrentUser(user);
    window.localStorage.setItem("currentUser", JSON.stringify(user));
  }

  function handleUpdatedPosts() {
    loadData();
  }

  return (
    <UserContext.Provider
      value={{
        users,
        posts,
        handleUpdateUser,
        logout,
        currentUser,
        handleCurrentUser,
        handleUpdatedPosts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser should be used inside the provider!!!");
  }
  return context;
}

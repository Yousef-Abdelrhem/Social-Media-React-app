import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import { UserProvider, useUser } from "./contexts/UserContext";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/editPost";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserProvider>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/addPost" element={<AddPost />}></Route>
          <Route path="/editPost/:id" element={<EditPost />}></Route>
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;

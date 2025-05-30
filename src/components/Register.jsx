import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import LoginComponent from "./LoginComponent";
import SignUp from "./SignUp";

const Register = () => {
  const [choice, setChoice] = useState("login");
  const [isLogged, setIsLogged] = useState(false);
  const tabs = [
    { name: "Login", value: "login" },
    { name: "Register", value: "register" },
  ];

  function handleChoice(choice) {
    setChoice(choice);
  }

  useEffect(() => {}, [isLogged]);

  return (
    <>
      <Container
        maxWidth="sm"
        className="h-screen flex flex-col justify-center rounded-[10rem]"
      >
        <Paper elevation={5} className="flex flex-col h-[90vh] relative p-3">
          <Avatar
            className="absolute "
            sx={{
              bgcolor: " #1976D2",
              top: "-40px",
              left: "50%",
              transform: "translateX(-50%) ",

              width: "4rem",
              height: "4rem",
            }}
          >
            <LockOutlineIcon sx={{ fontSize: 32 }} />
          </Avatar>

          <h2 className="font-bold text-3xl flex justify-center ">
            {choice == "login" ? "Login" : "Create Account"}
          </h2>

          {/* login and register Tabs */}
          <div className="flex justify-center align-center">
            {tabs.map((itm) => (
              <button
                key={itm.value}
                className={`text-2xl p-4 w-1/2 translate-all duration-200 mt-2 ${
                  choice == itm.value
                    ? "text-main-500 border-b-2 font-semibold "
                    : "text-gray-500 "
                }`}
                onClick={() => setChoice(itm.value)}
              >
                {itm.name}
              </button>
            ))}
          </div>
          {/* Loading forms */}
          <div className="flex justify-center items-center  flex-grow ">
            {choice === "login" ? (
              <LoginComponent />
            ) : (
              <SignUp handleChoice={handleChoice} />
            )}
          </div>
        </Paper>
      </Container>
    </>
  );
};

export default Register;

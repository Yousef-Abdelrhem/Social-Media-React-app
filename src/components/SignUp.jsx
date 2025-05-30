import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { API_URL } from "../services/api";
import axios from "axios";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useUser } from "../contexts/UserContext";

const SignUp = ({ handleChoice }) => {
  const { handleUpdateUser } = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  async function onSubmit(data) {
    try {
      const res = await axios.post(API_URL + "/auth/register", data);
      handleChoice("login");
    } catch (e) {
      console.log(e.response?.data?.message);

      if (e.response?.data?.message == "Email already exists") {
        setError("email", {
          type: "manual",
          message: "Email already exists",
        });
      }
    }
  }

  return (
    <form
      className="w-full flex flex-col justify-evenly h-full p-4 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-8">
        <TextField
          id="Name"
          label="Name"
          className="w-full"
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          {...register("name", {
            required: "Name is Required",
            maxLength: {
              value: 10,
              message: "Name must be 10 characters or less",
            },
          })}
        />

        <TextField
          id="email"
          label="Email Address"
          className="w-full"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Please enter a valid email address",
            },
          })}
        />

        <FormControl variant="outlined" className="w-full">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            error={Boolean(errors.password)}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
                message: "Password must include a capital letter and a number",
              },
            })}
            id="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {errors.password?.message && (
            <FormHelperText sx={{ color: "red" }}>
              {errors.password.message}
            </FormHelperText>
          )}
        </FormControl>
      </div>

      <Button
        variant="contained"
        size="large"
        className="rounded !mt-3"
        type="submit"
      >
        Sign In
      </Button>
    </form>
  );
};

export default SignUp;

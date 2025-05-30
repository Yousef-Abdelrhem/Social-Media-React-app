import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { API_URL } from "../services/api";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useUser } from "../contexts/UserContext";

const LoginComponent = () => {
  const { handleCurrentUser } = useUser();
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function onSubmit(formData) {
    try {
      const { data } = await axios.post(API_URL + "/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      setLoading(true);
      console.log("Login successful", data);
      window.localStorage.setItem("token", data.token);

      
      handleCurrentUser(formData.email);
      
      navigator("/");
    } catch (error) {
      setLoading(false);
      console.error("Login failed", error.response?.data);

      if (error.response?.status === 401) {
        setError("root", {
          type: "manual",
          message: "Invalid email or password",
        });
      } else if (error.response?.data?.message) {
        setError("root", {
          type: "manual",
          message: error.response.data.message,
        });
      }
    }
  }

  return (
    <form
      className="w-full flex flex-col justify-evenly h-full p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-8">
        <TextField
          id="email"
          label="Email"
          className="w-full"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />

        <FormControl
          variant="outlined"
          className="w-full"
          error={Boolean(errors.password)}
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
            })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "hide password" : "show password"}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {errors.password && (
            <FormHelperText error>{errors.password.message}</FormHelperText>
          )}
        </FormControl>
      </div>

      {errors.root && (
        <Box sx={{ mt: 2 }}>
          <FormHelperText
            error
            sx={{ textAlign: "center", fontSize: "0.875rem" }}
          >
            {errors.root.message}
          </FormHelperText>
        </Box>
      )}

      <Button
        variant="contained"
        size="large"
        className="rounded mt-4"
        type="submit"
        disabled={isSubmitting}
        loading={loading}
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
};

export default LoginComponent;

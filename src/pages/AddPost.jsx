import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import { useUser } from "../contexts/UserContext";

const AddPost = () => {
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const { handleCurrentUser } = useUser();
  const API_URL = "http://localhost:4000";
  const [img, setImg] = useState(
    "https://cdn.pixabay.com/photo/2025/04/28/19/59/female-model-9565629_1280.jpg"
  );
  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { currentUser, posts, handleUpdatedPosts } = useUser();
  const watchedImageUrl = watch("imageUrl");

  async function onSubmit(formData) {
    if (!currentUser) {
      setError("root", {
        type: "manual",
        message: "You must be logged in to create a post",
      });
      return;
    }

    try {
      setLoading(true);
      const idNumber = posts.length + 1;
      const { data } = await axios.post(`${API_URL}/posts`, {
        title: formData.title,
        description: formData.description,
        image: formData.imageUrl,
        id: idNumber.toString(),
        authorId: currentUser.id,
      });

      console.log("Post created successfully:", data);
      handleUpdatedPosts();
      navigate("/");
    } catch (error) {
      console.error("Post creation failed", error);

      setError("root", {
        type: "manual",
        message:
          error.response?.data?.message ||
          "Failed to create post. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="flex justify-center items-center h-screen">
      <Paper sx={{ width: "80vw" }} elevation={10}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: "start",
            py: 2,
            marginLeft: "1rem",
            marginTop: "1rem",
            fontWeight: "bold",
            color: "#1976d2",
          }}
        >
          Create Post
        </Typography>{" "}
        <form
          className="w-full flex flex-col justify-evenly h-full p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-8">
            <TextField
              id="title"
              label="Title"
              className="w-full"
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
              {...register("title", {
                required: "title is required",
                minLength: {
                  value: 5,
                  message: "this should be at least 5 chars",
                },
                maxLength: {
                  value: 20,
                  message: "title should be less that 20 char",
                },
              })}
            />

            <TextField
              id="description"
              label="description"
              className="w-full"
              error={Boolean(errors.description)}
              helperText={errors.description?.message}
              {...register("description", {
                required: "description is required",
              })}
            />

            <TextField
              id="imageUrl"
              label="imageUrl"
              className="w-full"
              error={Boolean(errors.imageUrl)}
              helperText={errors.imageUrl?.message}
              {...register("imageUrl", {
                required: "title is required",
              })}
            />
          </div>

          <Typography className="text-left !mt-4 !mb-4 text-bold">
            Image Preview
          </Typography>

          <Box>
            <Box
              component="img"
              alt="Post preview"
              a
              onChange={(e) => {
                setImg((prev) => e.target.value);
                setValue("imageUrl", e.target.event);
              }}
              src={watchedImageUrl || img}
              sx={{
                maxWidth: "100%",
                height: "auto",
                maxHeight: "300px",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                objectFit: "cover",
              }}
            />{" "}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              className="rounded"
              type="submit"
              disabled={isSubmitting}
              sx={{ width: "10rem" }}
            >
              {isSubmitting ? "Creating Post..." : "Create Post"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddPost;

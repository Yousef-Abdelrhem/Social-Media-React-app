import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router";

const Post = ({ itm, userName }) => {
  const API_URL = "http://localhost:4000";

  const { currentUser, handleUpdatedPosts } = useUser();
  const navigate = useNavigate();
  async function handleDelete() {
    console.log(itm.id);
    try {
      const res = await axios.delete(`${API_URL}/posts/${itm.id}`);
      console.log("deleted succesfully", res);
      handleUpdatedPosts();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={itm.image}
          alt="green iguana"
          sx={{ height: "35rem" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {itm.title}
          </Typography>

          <Box className="flex flex-col gap-3">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {itm.description}
            </Typography>
            <Typography className="text-main-500" sx={{ fontWeight: "bold" }}>
              Made by {userName}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      {+currentUser?.id == itm.authorId && (
        <CardActions className="flex justify-end !p-0">
          <Button
            onClick={() => navigate(`/editPost/${itm.id}`)}
            color="primary"
            className=" !p-0"
            sx={{
              width: "4rem",
              height: "4rem",
              margin: 0,
              padding: 0,
              minWidth: "unset",
              padding: "8px",
            }}
          >
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.2119 15.0977L11.6543 25.6553H8.6123V22.6133L19.1699 12.0557L22.2119 15.0977ZM22.7734 8.65723C22.8059 8.65723 22.8384 8.66071 22.8701 8.66699L22.9639 8.69531C22.994 8.70783 23.0228 8.72312 23.0498 8.74121L23.125 8.80273L25.4648 11.1426C25.6349 11.3128 25.6558 11.5737 25.5283 11.7666L25.4648 11.8447L23.9883 13.3213L20.9463 10.2793L22.4229 8.80273C22.4458 8.7797 22.4711 8.75923 22.498 8.74121L22.584 8.69531C22.614 8.68286 22.645 8.67332 22.6768 8.66699L22.7734 8.65723Z"
                fill="black"
                stroke="#1976D2"
              />
            </svg>
          </Button>

          <Button
            onClick={handleDelete}
            size="small"
            color="primary"
            className=" !p-0"
            sx={{
              width: "4rem",
              height: "4rem",
              margin: 0,
              padding: 0,
              minWidth: "unset",
              padding: "8px",
            }}
          >
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.583 12.6587V24.1558C22.583 24.9794 21.9066 25.6558 21.083 25.6558H13.085C12.2615 25.6556 11.5859 24.9793 11.5859 24.1558V12.6587H22.583ZM19.377 8.65967L20.2295 9.51318L20.376 9.65967H23.583V10.6587H10.5859V9.65967H13.792L14.792 8.65967H19.377Z"
                fill="black"
                stroke="#D32F2F"
              />
            </svg>
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default Post;

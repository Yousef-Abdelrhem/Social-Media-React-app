import { useEffect } from "react";
import NavBar from "../components/NavBar";
import Post from "../components/Post";
import { useUser } from "../contexts/UserContext";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router";

const Home = () => {
  const { currentUser, users, posts } = useUser();
  const navigator = useNavigate();
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      <main className="flex flex-wrap justify-center items-center p-4 gap-8 relative">
        {posts.map((itm) => {
          const author = users.find((user) => user.id == itm.authorId);
          return <Post itm={itm} userName={author?.name} key={itm.id} />;
        })}
        {currentUser && (
          <Button
            onClick={() => navigator("/addPost")}
            variant="outlined"
            sx={{
              border: "none",
              position: "fixed", // Changed from display: "absolute"
              bottom: "10%",
              right: "0rem",
              zIndex: 10,
              padding: 0,
              minWidth: "unset",
            }}
          >
            <svg
              width="93"
              height="93"
              viewBox="0 0 93 93"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_ddd_8_496)">
                <path
                  d="M18.1538 45.4719C18.1538 30.0082 30.6897 17.4724 46.1534 17.4724C61.6171 17.4724 74.153 30.0082 74.153 45.4719C74.153 60.9357 61.6171 73.4715 46.1534 73.4715C30.6897 73.4715 18.1538 60.9357 18.1538 45.4719Z"
                  fill="#F50057"
                />
                <path
                  d="M46.647 38.9672V44.9662H52.646V45.9653H46.647V51.9643H45.6479V45.9653H39.6489V44.9662H45.6479V38.9672H46.647Z"
                  fill="black"
                  stroke="white"
                />
              </g>
              <defs>
                <filter
                  id="filter0_ddd_8_496"
                  x="0.153809"
                  y="0.472351"
                  width="91.999"
                  height="91.9992"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feMorphology
                    radius="1"
                    operator="erode"
                    in="SourceAlpha"
                    result="effect1_dropShadow_8_496"
                  />
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="2.5" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_8_496"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="6" />
                  <feGaussianBlur stdDeviation="5" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_8_496"
                    result="effect2_dropShadow_8_496"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="9" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect2_dropShadow_8_496"
                    result="effect3_dropShadow_8_496"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect3_dropShadow_8_496"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </Button>
        )}
      </main>
    </>
  );
};

export default Home;

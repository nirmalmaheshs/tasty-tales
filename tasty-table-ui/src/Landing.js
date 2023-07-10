import { useEffect, useRef } from "react";

// typed-js
import Typed from "typed.js";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";


// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Images
import bgImage from "assets/images/bgstar.jpg";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Landing() {
  const typedJSRef = useRef(null);
  const navigate = useNavigate();

  const explore = () => {
    navigate('/recipes');
  }

  // Setting up typedJS
  useEffect(() => {
    const typedJS = new Typed(typedJSRef.current, {
      strings: ["Discover", "Cook", "Share"],
      typeSpeed: 70,
      backSpeed: 70,
      backDelay: 200,
      startDelay: 500,
      loop: true,
    });

    return () => typedJS.destroy();
  }, []);

  return (
    <MKBox component="header" position="relative">
      <Header />
      <MKBox
        display="flex"
        alignItems="center"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) => `${linearGradient(rgba(gradients.info.main, 0.5), rgba(gradients.info.state, 0.5))}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            mx="auto"
          >
            <MKTypography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Where Food Lovers Unite!<br></br> <span ref={typedJSRef} />
            </MKTypography>
            <MKTypography variant="body1" color="white" mt={1} mb={6} px={{ xs: 3, lg: 6 }}>
            Experience the joy of sharing and discovering mouthwatering recipes with our app. From 
            family favorites to global delights, connect with fellow food enthusiasts and elevate your 
            culinary adventures like never before.
            </MKTypography>
            <MKButton color="white" 
            onClick={explore}
            >Explore the Flavorful World of Recipes</MKButton>
          </Grid>
        </Container>
      </MKBox>
    </MKBox>
  );
}

export default Landing;

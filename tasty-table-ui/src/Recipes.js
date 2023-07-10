import MKBox from "components/MKBox";
import bgImage from "assets/images/bgstar.jpg";
import Header from "./Header";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { axiosInstance } from "./axios";
import axios from "axios";
import './Recipes.scss';
import DefaultBlogCard from "examples/Cards/BlogCards/DefaultBlogCard";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import MKTypography from "components/MKTypography";
import { Modal, Box, Button } from '@mui/material';
import MKButton from "components/MKButton";
import CreateRecipeModal from "CreateRecipeModal";

function Recipes() {
    const [recipes, setRecipes] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [ createModalOpen ,setCreateModalOpen] = useState(false);

    const handleCardClick = (recipe) => {
        setSelectedRecipe(recipe);
        setModalOpen(true);
    };

    const handleOpenModal = () => {
        setCreateModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        setCreateModalOpen(false);
    };

    useEffect(() => {
        getRecipes();
    }, [])

    const getRecipes = () => {
        axiosInstance.get(`/recipes`)
        .then((res) => {
            setRecipes(res.data);
        })
    }

    const getImage = (title) =>  {
        axios.get(`https://api.unsplash.com/search/photos?page=1&query=${title}&client_id=${process.env.REACT_APP_CLIENT_ID}`)
        .then((res) => {
            console.log(res);
        })
    }

    const handleCreateRecipe = (recipe) => {
        axiosInstance.post('/recipes', recipe)
        .then((res) => {
            getRecipes();
        })
    }
    return (
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
        <Header />
        

        <div className="recipes-container">
        <div className="recipes-title">
            <MKTypography variant="h2" color="white" mb={1}>
                Recipes
            </MKTypography>
            <MKButton onClick={handleOpenModal}>Add Recipe</MKButton>

        </div>
        <Container>
            <Grid container spacing={2}>
            {recipes.map((recipe) => (
                <Grid item key={recipe.id} xs={12} sm={6} md={4} lg={3}>
                    {/* <DefaultBlogCard
                        image={recipe?.image}
                        title={recipe?.title}
                        description={recipe?.description}
                        action={{
                          type: "internal",
                          route: "/somewhere",
                        }}
                      /> */}
                    <CardActionArea>
                      <Card className="cards-container" onClick={() => handleCardClick(recipe)}>
                            <CardMedia component="img" height="140" image={recipe.image} alt={recipe.title} />
                            <CardContent>
                            <Typography variant="h6">{recipe.title}</Typography>
                            <Typography variant="body2">{recipe.description}</Typography>
                            </CardContent>
                        </Card>
                    </CardActionArea>
                </Grid>
            ))}
            </Grid>
            <RecipeModal open={modalOpen} onClose={handleCloseModal} recipe={selectedRecipe} />
            <CreateRecipeModal open={createModalOpen} onClose={handleCloseModal} onCreate={handleCreateRecipe} />
        </Container>
        </div>
      </MKBox>
    )
}

const RecipeModal = ({ open, onClose, recipe }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 2 }}>
        <Typography variant="h6" component="div">
          {recipe?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe?.description}
        </Typography>
        <Typography variant="subtitle1" mt={2}>
          Ingredients:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {
            recipe?.ingredients.map(ingredient => 
                <p>{ingredient}</p>)
          }
        </Typography>
        <Typography variant="subtitle1" mt={2}>
          Instructions:
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {
            recipe?.instructions.map(instruction => 
                <p>{instruction}</p>)
          }
        </Typography>
        <Button onClick={onClose} mt={2}>Close</Button>
      </Box>
    </Modal>
  );
};

export default Recipes;
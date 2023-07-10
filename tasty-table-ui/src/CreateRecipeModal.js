import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import MKButton from 'components/MKButton';

const CreateRecipeModal = ({ open, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleCreate = () => {
    const recipe = {
      title,
      description,
      ingredients,
      instructions
    };
    setTitle('');
    setDescription('');
    setIngredients('');
    setInstructions('');
    onCreate(recipe);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 2 }}>
        <Typography variant="h6" component="div">
          Create Recipe
        </Typography>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          label="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <MKButton onClick={handleCreate} variant="contained" color="info">
            Create
        </MKButton>
      </Box>
    </Modal>
  );
};

export default CreateRecipeModal;

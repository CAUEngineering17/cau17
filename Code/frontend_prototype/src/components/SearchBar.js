import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('Tickets'); // Default search by option

  const searchOptions = ['title', 'assignee', 'status']; // Available search options

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Perform search logic here based on searchTerm and searchBy
    console.log(`Searching for: "${searchTerm}" in "${searchBy}"`);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <Typography variant="h6" sx={{ mr: 2 }}>Search:</Typography>

      <FormControl sx={{ mr: 2, width: 150 }}> {/* Adjust the width here */}
        <InputLabel id="search-by-label">Search By</InputLabel>
        <Select
          labelId="search-by-label"
          id="search-by-select"
          value={searchBy}
          label="Search By"
          onChange={handleSearchByChange}
        >
          {searchOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        placeholder="Enter your search term"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ flexGrow: 1, mr: 2 }}
      />
      <Button variant="contained" onClick={handleSearchSubmit}>
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;

import React from 'react';
import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({searchQuery, setSearchQuery}:SearchBarProps) => {
  return (
    <div className='flex items-center bg-white border rounded-md shadow-sm'>
        <IconButton>
            <SearchIcon/>
        </IconButton>
        <TextField
            placeholder="Search"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            value={searchQuery} // Control the input value
            onChange={(e) => setSearchQuery(e.target.value)} 
        />

    </div>
  )
}

export default SearchBar
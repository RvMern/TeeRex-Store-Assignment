import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch } from 'react-redux'
import { getAllSearchedProducts } from '../Redux/productSlice'
import {useNavigate} from 'react-router-dom'

const SearchCard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('red hoodie')

  const handleChange = (e) => {
    const { value } = e.target
    setSearchTerm(value)
  }

  const handleSearch = () => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('search', searchTerm);
    navigate(`?${newParams.toString()}`);
  }


  return (
    <Box className='flex lg:justify-center justify-end items-center pt-20 lg:mx-12'>
        <Box className='flex justify-center w-full sm:w-96 mx-2'>
          <TextField
            onChange={handleChange}
            fullWidth
            autoComplete="true"
            label="Search"
            id="search"
            variant='standard'
            placeholder='Search Products Here...'
          />
          <Button onClick={handleSearch} variant={'contained'} sx={{borderRadius:3, ml:1}} type='submit'>
              <SearchIcon fontSize='large' />
          </Button>
        </Box>
    </Box>
  )
}

export default SearchCard
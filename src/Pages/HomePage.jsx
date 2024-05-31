import React, { useEffect } from 'react'
import {Box,Grid, Typography} from '@mui/material'
import SearchCard from '../Components/SearchCard'
import FilterCard from '../Components/FilterCard'
import ProductCard from '../Components/ProductCard'
import {useMutation, useQuery} from '@tanstack/react-query'
import { getAllProductsService } from '../Services/productService'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getAllSearchedProducts, getProductErrorAction } from '../Redux/productSlice'
import {useLocation} from 'react-router-dom'

const HomePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {allProducts} = useSelector(state => state.product)
  const mutation = useMutation({mutationFn:getAllProductsService,mutationKey:['Get All Products']})

  useEffect(() => {
    if (mutation.isError) {
      dispatch(getProductErrorAction(mutation.error));
    }

    if (mutation.isSuccess) {
      dispatch(getAllProducts(mutation.data));
    }
  }, [mutation.isError, mutation.isSuccess, mutation.error, mutation.data, dispatch]);

  useEffect(()=>{
    const newParams = new URLSearchParams(location.search);
      const paramsData = {
        search: newParams.get('search') ? newParams.get('search') :'',
        color: newParams.get('color') ? newParams.get('color') :'',
        gender: newParams.get('gender') ? newParams.get('gender') :'',
        type: newParams.get('type') ? newParams.get('type') : '',
        price: newParams.get('price') ? newParams.get('price') : '',
      }
      mutation.mutate(paramsData)
  },[location])

  // Remove query parameters when the component mounts
  const queryParams = new URLSearchParams(location.search);
    if (queryParams.toString()) {
      history.replaceState({}, document.title, window.location.pathname
    );
  }
  
  
  return (
    <Box component={'section'} className=''>
        <SearchCard />
        <Box sx={{position:'relative'}} className='flex flex-col justify-center items-center mt-10 relative
        xl:flex-row xl:items-start gap-x-5 lg:p-8'>
          <FilterCard />
          <Grid sx={{width:'90%'}} container className='justify-center xl:justify-normal items-start' component='main'>
          {mutation.isSuccess && mutation.data && mutation.data?.allProducts?.length > 0 ? <ProductCard /> :
          <Grid item sx={{width:'60%', height:500}} component={'div'} className='flex justify-center items-center'>
            <Typography variant='h5'>
                No Products Found
            </Typography>
          </Grid>}
          </Grid>
        </Box>
    </Box>
  )
}

export default HomePage
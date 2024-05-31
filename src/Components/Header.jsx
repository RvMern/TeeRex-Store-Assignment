import { Box, Typography, Badge, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../Redux/userSlice';


const Header = () => {
  const navigate = useNavigate();
  const { cart, user } = useSelector(state => state.user)
  const parsedCart = user && user.cart ? JSON.parse(user.cart) : [];
  const dispatch = useDispatch();
  const [cartLength, setCartLength] = useState(0); 

  useEffect(()=>{
      setCartLength(cart.length != 0 && JSON.parse(cart).length);
  },[user, cart])

  const handleLogout = () => {
    dispatch(logoutAction())
    navigate('/login')
  }

  return (
    <Box sx={{bgcolor:'rgba(110,110,110,.3)'}} component={'section'} className='flex justify-between items-center py-4 px-8 lg:px-12'>
        <Typography className='animate-bounce' component={Link} to='/' variant='h6' sx={{":hover":{color:'purple'}, fontWeight:900}}>
            TeeRex Store
        </Typography>
        <Box className='flex w-60 justify-between items-center'>
            <Typography className='border-b-2 border-black'>
                Products
            </Typography>
            {
              user ? (<Button onClick={handleLogout} sx={{":hover":{bgcolor:'red', border:'red', color:'white'}}} variant='outlined' className='border-b-2 border-black'>
                Logout
            </Button>): (<Button component={Link} to={'/login'} className='border-b-2 border-black'>
                Login
            </Button>)
            }
            <Badge badgeContent={cartLength > 0 ? cartLength : "0"} color={'secondary'}>
              <Box component={Link} to='/cart'>
                <ShoppingCartIcon className='hover:transform, hover:-translate-y-1 hover:text-white hover:bg-black
                rounded-md hover:cursor-pointer transition-all' fontSize='large' sx={{bgcolor:'rgba(110,110,110,.3)', p:0.5, boxShadow:'0 0 5px rgba(0,0,0,.6)', width:52}} />
              </Box>
            </Badge>
        </Box>
    </Box>
  )
}

export default Header
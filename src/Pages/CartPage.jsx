import { Box, Divider, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderCard from "../Components/OrderCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartPage = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [parsedCart,setParsedCart] = useState([]);
  const {cart} = useSelector(state => state?.user)

  const calculateTotalAmount = () => {
    let total = 0;
    parsedCart.length > 0 && parsedCart?.map(item => {
      total = total + (item?.quantity * item?.prodId?.price)
    })
    setTotalAmount(total);
  };

  useEffect(()=>{
    cart.length > 0 && setParsedCart(JSON.parse(cart))
    calculateTotalAmount()
  },[parsedCart.length, cart.length])


  return (
    <Box component={"main"} className="p-4 lg:p-12">
      <Typography sx={{ py: 2 }} variant="h6">
        Shopping Cart
      </Typography>
      {parsedCart?.length > 0 ? <Box component={"div"}>
        {/* // ! Orders Section */}
        <Box
          component={"section"}
          className="flex flex-col justify-center py-10 lg:px-20"
        >
          <OrderCard />
        </Box>
        <Box component={"div"} className="lg:ml-20" sx={{ maxWidth: 600 }}>
          <Divider sx={{ borderBottomWidth: 4 }} />
        </Box>
        <Box
          component={"div"}
          sx={{ maxWidth: 600 }}
          className="flex my-6 justify-center items-center gap-x-10"
        >
          <Typography sx={{ fontWeight: 900 }} variant="h6">
            Total Amount
          </Typography>
          <Typography variant="body1">Rs. {totalAmount}</Typography>
        </Box>
        <Box component={"div"} sx={{ maxWidth: 600, textAlign: "center" }}>
          <Button
            component={Link}
            to="/payment"
            className="animate-bounce transition-all hover:transform hover:-translate-y-1"
            variant="contained"
            sx={{
              bgcolor: "purple",
              ":hover": { bgcolor: "black", color: "rgba(0,250,0,0.8)" },
            }}
          >
            Pay Now
          </Button>
        </Box>
      </Box>
      :
      <Box my={10} sx={{display:'flex', justifyContent:'center', height:300}}>
          <Box className="object-contain w-full" src="/Images/emptyCart.png" component={'img'}>
          </Box>
      </Box>
    }
    </Box>
  )
};

export default CartPage;

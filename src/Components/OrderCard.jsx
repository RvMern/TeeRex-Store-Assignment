import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useDispatch, useSelector } from "react-redux";
import { cartItemQuantityAction, getUserErrorAction, logoutAction, removeFromCartAction } from "../Redux/userSlice";
import { useMutation } from "@tanstack/react-query";
import { UpdateQuantityService, deleteFromCartService } from "../Services/userService";


const OrderCard = () => {
  const dispatch = useDispatch();
  const [parsedCart,setParsedCart] = useState([]);
  const {cart} = useSelector(state => state?.user)
  const mutation = useMutation({mutationFn:deleteFromCartService,mutationKey:['RemoveFromCart']})
  const quantityMutation = useMutation({mutationFn:UpdateQuantityService,mutationKey:['UpdateQuantity']})

  const [show, setShow] = useState(false);

  const handleShow = (e) => {
    if (show) {
      return setShow(false);
    }
    setShow(true);
  };

  const handleQuantity = (e,cartItemId) => {
    const { value } = e.target;
    if (value <= 0) {
      alert("Quantity should be more than 0");
    }
    quantityMutation.mutate({cartItemId,quantity:value});
  };

  useEffect(()=>{
    if (quantityMutation.isSuccess) {
      const checkIsError = Object.keys(quantityMutation.data).includes("isError");
      if (checkIsError) {
        dispatch(getUserErrorAction(quantityMutation.data));
      } else {
        dispatch(cartItemQuantityAction(quantityMutation.data));
        window.location.href = '/cart'
      }
    }
    if (mutation.isError) {
      dispatch(getUserErrorAction(quantityMutation.error));
    }
  },[quantityMutation?.isSuccess, quantityMutation?.isError, quantityMutation.data])

  useEffect(()=>{
    cart.length > 0 && setParsedCart(JSON.parse(cart))
  },[parsedCart.length, cart.length])

  useEffect(()=>{
    if(mutation.isSuccess && mutation?.data.hasOwnProperty('success')){
      dispatch(removeFromCartAction(mutation.data))
    }
  },[mutation.isSuccess, mutation.data])

  // ! Remove from Cart Handler
  const handleRemoveFromCart = (OrderId) => {
    mutation.mutate(OrderId);
  };

  return (
    <>
    {parsedCart.length > 0 && parsedCart?.map((item)=> {
      return <Card key={item?._id} sx={{ maxWidth: 600 }} className="flex my-5">
      <Box className="p-2">
        <CardMedia
          component="img"
          sx={{ height: 100, width: 100, objectFit: "contain" }}
          image={item?.prodId?.image}
        />
      </Box>
      <CardContent className="flex items-center justify-between w-full">
        <Box className="w-full">
          <Typography sx={{ fontWeight: 900 }} variant="subtitle1">
            {item?.prodId?.name}
          </Typography>
          <Typography sx={{ fontWeight: 900 }} variant="subtitle2">
            Rs {item?.prodId?.price}
          </Typography>
        </Box>
        <Box className="flex flex-col w-full mx-4">
          <Button
            onClick={handleShow}
            sx={{
              bgcolor: "rgba(0,0,0,.1)",
              minWidth: 100,
              borderRadius: 0,
              border: 1,
              borderColor: "rgba(0,0,0,.3)",
            }}
            endIcon={show ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          >
            qty: {item?.quantity}
          </Button>
          <TextField
            onBlur={(e)=>handleQuantity(e,item?._id)}
            placeholder={item?.quantity.toString()}
            name="quantity"
            id="quantity"
            label="Quantity"
            size="small"
            sx={
              show
                ? {
                    "& input[type=number]": {
                      MozAppearance: "textfield",
                    },
                    mt: 1,
                    "& input[type=number]": {
                      "-webkit-appearance": "textfield",
                      "-moz-appearance": "textfield",
                      appearance: "textfield",
                    },
                  }
                : { display: "none" }
            }
            type={"number"}
          ></TextField>
        </Box>
        <Box className="w-full">
          <Button
            onClick={() => handleRemoveFromCart(item?._id)}
            sx={{
              width: "100%",
              border: 1,
              fontWeight: 900,
              color: "rgba(110,110,110,.8,)",
              borderColor: "rgb(0,0,0)",
              ":hover": { color: "red", borderColor: "red" },
            }}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
     </Card>
    })
  }
  </>
  )
};

export default OrderCard;

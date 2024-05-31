import {
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Snackbar,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, getUserErrorAction } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addToCartService } from "../Services/userService";

const ProductCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state?.product);
  const { cart } = useSelector((state) => state?.user);

  const mutation = useMutation({
    mutationFn: addToCartService,
    mutationKey: ["addToCart"],
  });

  const handleAddToCart = (prodId) => {
    const parsedCart = JSON.parse(cart);
    if (parsedCart.length > 0) {
      const findItemInCart = parsedCart.find((item) => {
        return item?.prodId?._id === prodId;
      });
      if (findItemInCart) {
        return navigate("/cart");
      }
      mutation.mutate({ prodId, quantity: 1 });
      setInCart(true);
    } else {
      mutation.mutate({ prodId, quantity: 1 });
      setInCart(true);
    }
  };


  useEffect(() => {
    if (mutation.isError) {
      dispatch(getUserErrorAction(mutation.error));
    }

    if (mutation.isSuccess) {
      if (mutation.data.isError) {
        dispatch(getUserErrorAction(mutation.data));
      } else {
        dispatch(addToCartAction(mutation.data));
      }
    }
  }, [mutation.isError, mutation.isSuccess, mutation.data, dispatch]);

  return (
    allProducts &&
    allProducts?.map((item) => {
      const isInCart = JSON.parse(cart).some(
        (prod) => prod.prodId._id === item._id
      );
      return (
        <Grid
          key={item?._id}
          item
          xs={12}
          sm={5}
          lg={3.6}
          xl={3}
          component={"div"}
          sx={{ p: 1, m: 2, borderRadius: 6 }}
        >
          <Box sx={{ p: 0.9, pb: 2, borderRadius: 6.5 }}>
            <Box sx={{ boxShadow: "5px 5px 10px rgba(0,0,0,.2)" }}>
              <Card sx={{ p: 2, pb: 0, boxShadow: "none", borderRadius: 0 }}>
                <CardMedia
                  component="img"
                  alt={item?.name}
                  image={item?.image}
                  sx={{
                    height: 280,
                    boxShadow: "1px 1px 5px rgba(0,0,0,.2)",
                    objectFit: "contain",
                    borderRadius: 0,
                  }}
                />
                <CardContent
                  sx={{p:0, pt: 2 }}
                  className="flex items-center flex-wrap justify-between"
                >
                  <Box > 
                    <Typography variant="h6" fontWeight={900}>
                      {item?.name}
                    </Typography>
                    <Typography variant="body2" fontWeight={900}>
                      Rs {item?.price}
                    </Typography>
                  </Box>
                  <Button
                    onClick={() => handleAddToCart(item?._id)}
                    variant="contained"
                    sx={{
                      bgcolor: "rgba(0,0,0,.8)",
                      borderRadius: 0,
                      ":hover": { bgcolor: "purple" },
                    }}
                  >
                    {isInCart ? (
                      <>
                        {" "}
                        Go To Cart <CheckCircleIcon sx={{ ml: 1 }} />{" "}
                      </>
                    ) : (
                      "Add To Cart"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Grid>
      );
    })
  );
};

export default ProductCard;

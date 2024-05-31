import axios from "axios";

const loginUserService = async (userData) => {
  try {
    const response = await axios.post(
      "https://teerex-store-assignment-backend.onrender.com//api/v1/user/login",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true
      }
    );
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};

const registerUserService = async (userData) => {
  try {
    const response = await axios.post(
      "https://teerex-store-assignment-backend.onrender.com/api/v1/user/register",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true
      },
    );
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};


const addToCartService = async (productData) => {
  try {
    const response = await axios.post(
      "https://teerex-store-assignment-backend.onrender.com/api/v1/user/addproducttocart",
      productData,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": JSON.parse(window.localStorage.getItem('token'))
        },
        withCredentials:true
      }
    );
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};

const deleteFromCartService = async (orderId) => {
  try {
    const response = await axios.delete(
      "https://teerex-store-assignment-backend.onrender.com/deleteproductfromcart",{
        data:{orderId},
        headers: {
          "Content-Type": "application/json",
          "Authorization": JSON.parse(window.localStorage.getItem('token'))
        },
        withCredentials:true
      }
    );
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};

const UpdateQuantityService = async (quantityData) => {
  try {
    const response = await axios.put(
      "https://teerex-store-assignment-backend.onrender.com/api/v1/user/updatequantityincart",quantityData,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": JSON.parse(window.localStorage.getItem('token'))
        },
        withCredentials:true
      }
    );
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export { loginUserService, addToCartService, deleteFromCartService, UpdateQuantityService, registerUserService };

import axios from "axios";

const getAllProductsService = async (queryParams) => {
  try {
    const response = await axios.post(
      "https://teerex-store-assignment-backend.onrender.com/api/v1/product/allproducts",
      queryParams,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};


export { getAllProductsService};

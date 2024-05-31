import axios from "axios";

const getAllProductsService = async (queryParams) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/v1/product/allproducts",
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

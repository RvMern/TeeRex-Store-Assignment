# React + Vite

Vite React Project

Table of Contents

A. Introduction
B. Prerequisites
C. Installation
D. Environment Variables
E. Running the Project
F. Accessing the Product Browsing and Cart Pages
G. Updating Service URLs



A. Introduction
This is a Vite React project with both frontend and backend components. The project requires setting up environment variables and updating service URLs to run correctly.


B. Prerequisites
Node.js (version 14 or higher)
npm (version 6 or higher)


C. Installation

a. Clone the repository:
git clone https://github.com/your-repo/vite-react-project.git
cd vite-react-project

b. Install frontend dependencies:
npm install

c. Install backend dependencies:
cd ./Backend
npm install


D. Environment Variables
Create a .env file in the backend directory and provide the following environment variables with their respective values:

PORT=your_port
HOSTNAME=your_hostname
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret


E. Running the Project

a. Start the backend server:
cd Backend
npm run start
npm run server (for running server using nodemon)

b.Start the frontend development server:
npm run dev


F. Accessing the Product Browsing and Cart Pages

After running the project, follow these steps to access the product browsing page and cart:
a. Register a new account.
b. Log in with the registered account.c. 
c. Upon successful login, you will be redirected to the product browsing page where you can view and add products to your cart.


G. Updating Service URLs

In the src folder inside the services directory of the frontend, update the service URLs to point to your local backend server.

For userService.jsx file, update the URL to:

`http://{LOCAL_HOSTNAME}:{LOCAL_PORT}/api/v1/user/...`;

productService.jsx, update the URL to:
`http://{LOCAL_HOSTNAME}:{LOCAL_PORT}/api/v1/product/...`;

Replace {LOCAL_HOSTNAME} and {LOCAL_PORT} with the appropriate values.

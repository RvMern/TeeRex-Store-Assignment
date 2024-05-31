import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";
import CartPage from "./Pages/CartPage";
import Login from "./Pages/Login";
import PrivateRoute from "./Private/PrivateRoute";
import Register from "./Pages/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* // ! Close Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />

          {/* // ! Open Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

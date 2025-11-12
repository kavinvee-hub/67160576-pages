import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import AnimationPage from "./pages/AnimationPage.jsx";
import ComponentDemo from "./pages/ComponentDemo";
import Todos from "./pages/todos";
import Login from "./pages/Login";
import Prodouts from "./pages/prodouts";
import Carts from "./pages/Carts"; 
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0); 

  
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setTotalProducts(storedCart.length);
  }, []);

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                setIsLoggedIn={setIsLoggedIn}
                totalProducts={totalProducts}
              />
            }
          >
            <Route index element={<Home />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="animation" element={<AnimationPage />} />
            <Route path="component" element={<ComponentDemo />} />
            <Route path="todos" element={<Todos />} />

            
            <Route
              path="prodouts"
              element={<Prodouts setTotalProducts={setTotalProducts} />}
            />


            <Route path="carts" element={<Carts />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;

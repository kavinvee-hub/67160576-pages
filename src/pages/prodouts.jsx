import { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { fetchProdouts } from "../data/prodoutsdata";
import "../styles/Prodouts.css";

export default function Prodouts({ setTotalProducts }) {
  const [prodouts, setProdouts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const data = fetchProdouts();
    setProdouts(data);

    
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  const handleAddToCart = (id) => {
    let updatedCart;

    if (cartItems.includes(id)) {
      
      updatedCart = cartItems.filter((itemId) => itemId !== id);
    } else {
    
      updatedCart = [...cartItems, id];
    }

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setTotalProducts(updatedCart.length); 
  };

  return (
    <div className="products-container">
      <h3 className="text-dark mb-4 fw-bold">Products List</h3>

      <Row xs={2} md={3} lg={5} className="g-4">
        {prodouts.map((prodout) => (
          <Col key={prodout.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={prodout.thumbnailUrl}
                className="product-img"
              />
              <Card.Body>
                <Card.Text className="product-title">{prodout.title}</Card.Text>
                <Card.Text className="text-muted">
                  ${prodout.price.toFixed(2)}
                </Card.Text>
                <Button
                  variant={cartItems.includes(prodout.id) ? "danger" : "primary"}
                  onClick={() => handleAddToCart(prodout.id)}
                >
                  {cartItems.includes(prodout.id)
                    ? "Added to carts"
                    : "Add to carts"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

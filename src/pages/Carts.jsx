import { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { fetchProdouts } from "../data/prodoutsdata";
import "../styles/Carts.css";

export default function Carts() {
  const [cartItems, setCartItems] = useState([]);
  const [prodouts, setProdouts] = useState([]);

  useEffect(() => {
    const data = fetchProdouts();

    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
    setProdouts(data);
  }, []);

  
  const handleDelete = (id) => {
    const updatedCart = cartItems.filter((itemId) => itemId !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };
  const cartProducts = prodouts.filter((p) => cartItems.includes(p.id));

  const totalPrice = cartProducts.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="carts-container">
      <h3 className="fw-bold text-dark mb-4">🛒 Your Carts</h3>

      {cartProducts.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <>
          <Row xs={2} md={3} lg={5} className="g-4">
            {cartProducts.map((item) => (
              <Col key={item.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={item.thumbnailUrl}
                    className="cart-img"
                  />
                  <Card.Body>
                    <Card.Text className="cart-title">{item.title}</Card.Text>
                    <Card.Text className="text-muted">
                      ${item.price.toFixed(2)}
                    </Card.Text>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete from Carts
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="cart-summary">
            <div className="summary-details">
              <span>
                Products: <b>{cartProducts.length} items</b>
              </span>
              <span className="total-price">
                Total price: ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Button variant="warning" className="checkout-btn">
              Checkout 💳
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

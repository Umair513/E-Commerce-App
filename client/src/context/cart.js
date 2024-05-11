import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios"


const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(()=> {
    let existingCartItems = localStorage.getItem("cart")
    if(existingCartItems) setCart(JSON.parse(existingCartItems))
  }, [])
  
  
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
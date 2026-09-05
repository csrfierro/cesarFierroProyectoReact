import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const isInCart = (id) => cartItems.some((item) => item.id === id)

  const addItem = (item, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      }

      return [...prevItems, { ...item, quantity }]
    })
  }

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const clearCart = () => setCartItems([])

  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0)

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.quantity * item.price, 0)

  const value = {
    cartItems,
    isInCart,
    addItem,
    removeItem,
    clearCart,
    getTotalItems,
    getTotalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

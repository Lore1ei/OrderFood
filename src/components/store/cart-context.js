import React from "react";

const CartContext = React.createContext({
    items: [2323],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {}
})

export default CartContext;
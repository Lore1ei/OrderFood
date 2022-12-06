import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import CartContext from "../store/cart-context";
import {useContext} from "react";
import CartItem from "./CartItem";

const Cart = props => {
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const itemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    }

    const itemRemoveHandler = id => {
        cartCtx.removeItem(id)
    }

    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map(item =>
        <CartItem key={item.id} amount={item.amount} name={item.name} price={item.price}
                  onRemove={itemRemoveHandler.bind(null, item.id)}
                  onAdd={itemAddHandler.bind(null, item)} />
    )}</ul>;

    return(
        <Modal onClose={props.onHideCartHandler}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onHideCartHandler} className={classes['button--alt']}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart;
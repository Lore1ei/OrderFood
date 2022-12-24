import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import CartContext from "../store/cart-context";
import {useContext, useState} from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);
    const itemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    }
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const itemRemoveHandler = id => {
        cartCtx.removeItem(id)
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://reactfoodapp-c9892-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map(item =>
        <CartItem key={item.id} amount={item.amount} name={item.name} price={item.price}
                  onRemove={itemRemoveHandler.bind(null, item.id)}
                  onAdd={itemAddHandler.bind(null, item)} />
    )}</ul>;

    const modalActions = (<div className={classes.actions}>
        <button onClick={props.onHideCartHandler} className={classes['button--alt']}>Close</button>
        {hasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
    </div>)

    const cartModalContent = <> {cartItems}
    <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
    </div>
    {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCartHandler} />}
    {!isCheckout && modalActions}
    </>

    const didSubmitModalContent = <> <p>Successfully sent the order</p>
        <div className={classes.actions}>
            <button onClick={props.onHideCartHandler} className={classes.button}>Close</button>
        </div>
    </>;

    const isSubmittingModal =  <p>Sending order data</p>;

    return(
        <Modal onClose={props.onHideCartHandler}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModal}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart;
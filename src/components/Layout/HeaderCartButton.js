import {useContext, useEffect, useState} from "react";
import CartContext from "../store/cart-context";
import classes from './HeaderCartButton.module.css'
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = props => {
    const [btnIsHighlight, setBtnIsHighlight] = useState(false);
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlight ? classes.bump : ''}`;

    const {items} = cartCtx;

    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnIsHighlight(true);

       const timer = setTimeout(() => {
            setBtnIsHighlight(false);
        },300)

        return () => {
           clearTimeout(timer)
        }
    }, [items])

    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;
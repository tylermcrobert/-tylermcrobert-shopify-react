/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
import { useEffect } from 'react';
import { Cart, ICheckout, ICheckoutLineItem, ShopifyClient } from '../types';
import { useReducer } from 'reinspect';

const LOCAL_STORAGE_CHECKOUT_TOKEN = 'checkoutToken';

export const initialCart: Cart = {
  isCartOpen: false,
  errorAdding: false,
  isLoading: false,
  cartFetchError: false,
  shopifyCheckout: null,
};

type Action =
  | { type: 'updateCheckout'; checkout: ICheckout }
  | { type: 'setCartErr'; err: any }
  | { type: 'setLoading' }
  | { type: 'setIsCartOpen'; payload: boolean };

function reducer(state: Cart, action: Action): Cart {
  switch (action.type) {
    case 'updateCheckout':
      return {
        ...state,
        shopifyCheckout: action.checkout,
        cartFetchError: false,
        isLoading: false,
      };
    case 'setCartErr':
      return { ...state, cartFetchError: true };
    case 'setLoading':
      return { ...state, isLoading: true };
    case 'setIsCartOpen':
      return { ...state, isCartOpen: action.payload };
    default:
      return state;
  }
}

type HookReturn = {
  cart: Cart;
  addToCart: (variantId: string, qty: number) => void;
  openCart: () => void;
  closeCart: () => void;
  updateLineItem: (id: string, payload: Partial<ICheckoutLineItem>) => void;
};

const useCartControls = (client: ShopifyClient): HookReturn => {
  const [cart, dispatch] = useReducer(
    reducer,
    initialCart,
    state => state,
    'cart'
  );

  /** Helpers */
  const updateCheckout = (checkout: ICheckout) =>
    dispatch({ type: 'updateCheckout', checkout });
  const setCartErr = (err: any) => dispatch({ type: 'setCartErr', err });

  /** Mount cart on load */
  useEffect(() => {
    const localStorageToken = localStorage.getItem(
      LOCAL_STORAGE_CHECKOUT_TOKEN
    );
    dispatch({ type: 'setLoading' });

    const createNewCheckout = () => {
      client.checkout
        .create()
        .then((checkout: ICheckout) => {
          updateCheckout(checkout);
          localStorage.setItem(LOCAL_STORAGE_CHECKOUT_TOKEN, checkout.id);
        })
        .catch((err: any) => setCartErr(err));
    };

    if (localStorageToken) {
      client.checkout
        .fetch(localStorageToken)
        .then((checkout: ICheckout) => updateCheckout(checkout))
        .catch((err: any) => {
          setCartErr(err);
          createNewCheckout();
        });
    } else {
      createNewCheckout();
    }
  }, []);

  /** Functions */

  const addToCart = (variantId: string, qty: number) => {
    dispatch({ type: 'setLoading' });

    if (cart.shopifyCheckout) {
      client.checkout
        .addLineItems(cart.shopifyCheckout.id, [
          {
            variantId,
            quantity: qty,
          },
        ])
        .then((checkout: ICheckout) => {
          updateCheckout(checkout);
          dispatch({ type: 'setIsCartOpen', payload: true });
        })
        .catch((err: any) => setCartErr(err));
    } else {
      dispatch({ type: 'setCartErr', err: 'No shopify cart loaded' });
    }
  };

  const openCart = () => dispatch({ type: 'setIsCartOpen', payload: true });
  const closeCart = () => dispatch({ type: 'setIsCartOpen', payload: false });

  const updateLineItem = (id: string, payload: Partial<ICheckoutLineItem>) => {
    // TODO: set 'is loading true' and block new interactions in here
    if (cart.shopifyCheckout) {
      client.checkout
        .updateLineItems(cart.shopifyCheckout.id, { id, ...payload })
        .then((newCheckout: ICheckout) => updateCheckout(newCheckout));
    }
  };

  return {
    cart,
    addToCart,
    openCart,
    closeCart,
    updateLineItem,
  };
};

export default useCartControls;

'use client';

import { router, usePage } from '@inertiajs/react';
import { createContext, useContext, useState, type ReactNode } from 'react';

import { Product } from '@/types';

export interface CartItem extends Omit<
    Product,
    'category, stock_quantity, created_at'
> {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    checkOut: () => void;
    checkoutSuccess: boolean;
    updateQuantity: (
        productId: number,
        quantity: number,
        action: string,
    ) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const { props } = usePage();

    const initialCart: CartItem[] =
        // @ts-expect-error --- props can be allowed
        (props as {cartItems: CartItem[]}).cartitems ??
        // @ts-expect-error --- props can be allowed
        (props as {cartItems: CartItem[]}).cartItems ??
        [];

    const [cart, setCart] = useState<CartItem[]>(initialCart);
    const [cartCount, setCartCount] = useState<number>(
        initialCart.reduce((sum, item) => sum + item.quantity, 0),
    );
    const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);

    const addToCart = (product: Product) => {
        if (checkoutSuccess) setCheckoutSuccess(false);
        router.post(
            `/cart/add/${product.id}`,
            {},
            {
                onSuccess: ({ props }) => {
                    // @ts-expect-error -- props can be allowed
                    const newCart = (props as {success: CartItem[]}).success as CartItem;
                    setCart((prev) => {
                        /// Check id the cart exists
                        let allCart = prev;
                        const existing = prev.find(
                            (item) => item.id === newCart.id,
                        );
                        if (existing) {
                            allCart = prev.map((item) =>
                                item.id === newCart.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item,
                            );
                        } else {
                            allCart = [...prev, newCart];
                        }
                        setCartCount(
                            allCart.reduce(
                                (sum, item) => sum + item.quantity,
                                0,
                            ),
                        );
                        return allCart;
                    });
                },
                onError: (error) => {
                    console.log(error);
                },
            },
        );
    };

    const removeFromCart = (productId: number) => {
        router.delete(`/cart/remove/${productId}`, {
            onSuccess: () => {
                setCart((prev) => {
                    const cartItems = prev.filter(
                        (item) => item.id !== productId,
                    );
                    setCartCount(
                        cartItems.reduce((sum, item) => sum + item.quantity, 0),
                    );
                    return cartItems;
                });
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    const updateQuantity = (
        productId: number,
        quantity: number,
        action: string,
    ) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        router.patch(
            `/cart/update/${productId}`,
            {
                action,
            },
            {
                onSuccess: () => {
                    setCart((prev) =>
                        prev.map((item) =>
                            item.id === productId
                                ? { ...item, quantity }
                                : item,
                        ),
                    );
                },
                onError: (error) => {
                    console.log(error);
                },
            },
        );
    };

    const clearCart = () => {
        router.delete(route('clear.cart'), {
            onSuccess: () => {
                setCart([]);
                setCartCount(0);
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    const cartTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    const checkOut = () => {
        router.post(
            route('order.create'),
            {
                orders: cart.map((crt) => ({
                    product_id: crt.id,
                    price: crt.price,
                    quantity: crt.quantity,
                })),
                total_price: cartTotal,
            },
            {
                onSuccess: () => {
                    clearCart();
                    setCheckoutSuccess(true);
                },
                onError: (error) => {
                    console.log(error);
                },
            },
        );
    };

    //const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                checkOut,
                checkoutSuccess,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

import { Product } from '@/types';
import { router, usePage } from '@inertiajs/react';

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const { props } = usePage();

    const initialCart: CartItem[] =
        (props as any).auth?.cart_items ?? (props as any).user?.cart_items ?? [];

    const [cart, setCart] = useState<CartItem[]>(initialCart);

    const addToCart = (product: Product) => {
        router.post(
            `/cart/add/${product.id}`,
            {},
            {
                onSuccess: ({props}) => {
                    console.log(data)
                    const cartItems = props.auth.cart_items;
                    setCart((prev) => {
                      const existing = prev.find((item) => item.id === product.id);
                      if (existing) {
                        return prev.map((item) =>
                          item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                        );
                      }
                      return [...prev, { ...product, quantity: 1 }];
                    });
                },
                onError: (error) => {
                    console.log(error);
                },
            },
        );
    };

    const removeFromCart = (productId: number) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item,
            ),
        );
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
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

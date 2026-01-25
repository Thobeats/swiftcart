'use client';

import { CheckCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        clearCart,
        checkOut,
        checkoutSuccess,
    } = useCart();

    return (
        <>
            {/* Backdrop */}
            <div
                className={`bg-background/80 fixed inset-0 z-50 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
                onClick={onClose}
            />

            {/* Slide-in Panel */}
            <div
                className={`bg-background border-border fixed inset-y-0 right-0 z-50 w-full max-w-md transform border-l shadow-xl transition-transform duration-300 ease-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="border-border flex items-center justify-between border-b p-6">
                        <h2 className="text-2xl font-bold">Your Cart</h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="rounded-full"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {cart.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center text-center">
                                {!checkoutSuccess ? (
                                    <>
                                        <ShoppingBag className="text-muted-foreground/50 mb-4 h-16 w-16" />
                                        <p className="text-muted-foreground text-lg font-medium">
                                            Your cart is empty
                                        </p>
                                        <p className="text-muted-foreground mt-1 text-sm">
                                            Add some products to get started
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="text-muted-foreground/50 mb-4 h-16 w-16" />
                                        <p className="text-muted-foreground text-lg font-medium">
                                            Checkout Successful
                                        </p>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="border-border flex gap-4 rounded-lg border p-4"
                                    >
                                        <div className="bg-secondary h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                                            <img
                                                src={
                                                    item.image ||
                                                    '/placeholder.svg'
                                                }
                                                alt={item.name}
                                                width={80}
                                                height={80}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col">
                                            <div className="flex justify-between">
                                                <h3 className="font-medium">
                                                    {item.name}
                                                </h3>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-muted-foreground hover:text-destructive h-6 w-6"
                                                    onClick={() =>
                                                        removeFromCart(item.id)
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <p className="text-muted-foreground text-sm">
                                                ${item.price.toFixed(2)}
                                            </p>
                                            <div className="mt-auto flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 bg-transparent"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity -
                                                                    1,
                                                                'sub',
                                                            )
                                                        }
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 bg-transparent"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity +
                                                                    1,
                                                                'add',
                                                            )
                                                        }
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                                <span className="font-bold">
                                                    $
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="border-border space-y-4 border-t p-6">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Subtotal
                                </span>
                                <span className="text-2xl font-bold">
                                    ${cartTotal.toFixed(2)}
                                </span>
                            </div>
                            <Button
                                className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 w-full font-medium"
                                onClick={checkOut}
                            >
                                Checkout
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full bg-transparent"
                                onClick={clearCart}
                            >
                                Clear Cart
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

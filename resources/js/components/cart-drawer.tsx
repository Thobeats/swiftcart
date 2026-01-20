"use client";

import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart, checkOut } =
    useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-background border-l border-border shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-6">
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
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <p className="text-lg font-medium text-muted-foreground">
                  Your cart is empty
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add some products to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-lg border border-border p-4"
                  >
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1, 'sub')
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
                              updateQuantity(item.id, item.quantity + 1, 'add')
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
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
            <div className="border-t border-border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-2xl font-bold">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <Button
                className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
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

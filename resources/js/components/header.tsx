'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/lib/cart-context';
import { router } from '@inertiajs/react';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
    auth: boolean | { name: string; email: string };
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onOpenCart: () => void;
}

export function Header({
    auth,
    searchQuery,
    onSearchChange,
    onOpenCart,
}: HeaderProps) {
    const { cartCount } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="bg-accent flex h-8 w-8 items-center justify-center rounded-lg">
                        <ShoppingCart className="text-accent-foreground h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                        SwiftCart
                    </span>
                </div>

                {/* Search Bar - Desktop */}
                <div className="mx-8 hidden max-w-md flex-1 md:flex">
                    <div className="relative w-full">
                        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                        <Input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="bg-secondary focus-visible:ring-accent w-full border-0 pl-10"
                        />
                    </div>
                </div>

                {/* Desktop Navigation */}
                {auth && typeof auth == 'object' ? (
                    <div className="hidden items-center gap-3 md:flex">
                        <div className="relative group">
                            <Button
                                variant="outline"
                                className="border-border hover:bg-secondary bg-transparent"
                            >
                                Welcome {auth.name}
                            </Button>
                            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all absolute right-0 mt-2 w-40 rounded-md border border-border bg-background shadow-md">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={() => router.get(route('dashboard'))}
                                >
                                    Dashboard
                                </Button>
                            </div>
                            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all absolute top-20 right-0 mt-2 w-40 rounded-md border border-border bg-background shadow-md">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={() => router.get(route('logout'))}
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                            onClick={onOpenCart}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="bg-accent text-accent-foreground absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium">
                                    {cartCount}
                                </span>
                            )}
                        </Button>
                    </div>
                ) : (
                    <div className="hidden items-center gap-3 md:flex">
                        <Button
                            variant="ghost"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => router.visit('/login')}
                        >
                            Login
                        </Button>
                        <Button
                            variant="outline"
                            className="border-border hover:bg-secondary bg-transparent"
                            onClick={() => router.visit('/register')}
                        >
                            Register
                        </Button>
                        {/* <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                            onClick={onOpenCart}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="bg-accent text-accent-foreground absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium">
                                    {cartCount}
                                </span>
                            )}
                        </Button> */}
                    </div>
                )}

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-2 md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                        onClick={onOpenCart}
                    >
                        <ShoppingCart className="h-5 w-5" />
                        {cartCount > 0 && (
                            <span className="bg-accent text-accent-foreground absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium">
                                {cartCount}
                            </span>
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="border-border bg-background border-t p-4 md:hidden">
                    <div className="relative mb-4">
                        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                        <Input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="bg-secondary w-full border-0 pl-10"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button
                            variant="ghost"
                            className="justify-start"
                            onClick={() => {
                                router.visit('/login');
                                setMobileMenuOpen(false);
                            }}
                        >
                            Login
                        </Button>
                        <Button
                            variant="outline"
                            className="justify-start bg-transparent"
                            onClick={() => {
                                router.visit('/register');
                                setMobileMenuOpen(false);
                            }}
                        >
                            Register
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}

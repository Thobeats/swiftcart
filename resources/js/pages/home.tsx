'use client';

import { CartDrawer } from '@/components/cart-drawer';
import { CategoryFilter } from '@/components/category-filter';
import { Header } from '@/components/header';
import { ProductCard } from '@/components/product-card';
import ShopLayout from '@/layouts/shop-layout';
import { CartProvider } from '@/lib/cart-context';
import { useMemo, useState } from 'react';
import { Category, Product } from '@/types';

type PageProps = {
    auth: boolean;
    products: Product[],
    categories: Category[]
};

function ShopContent({ auth, products, categories }: PageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
    const [cartOpen, setCartOpen] = useState(false);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                product.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            const matchesCategory =
                selectedCategory === 'All' ||
                product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);


    const handleSwitchAuthMode = () => {
        setAuthMode(authMode === 'login' ? 'register' : 'login');
    };

    return (
        <div className="bg-background min-h-screen">
            <Header
                auth={auth}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onOpenCart={() => setCartOpen(true)}
            />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <section className="mb-12 text-center">
                    <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        <span className="text-balance">
                            Shop Smart, Shop Fast
                        </span>
                    </h1>
                    <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg text-pretty">
                        Discover amazing products at unbeatable prices. Your
                        one-stop destination for all your shopping needs.
                    </p>
                </section>

                {/* Filters */}
                <section className="mb-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <CategoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                        />
                        <p className="text-muted-foreground text-sm">
                            {filteredProducts.length} products found
                        </p>
                    </div>
                </section>

                {/* Product Grid */}
                <section>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <p className="text-muted-foreground text-lg font-medium">
                                No products found
                            </p>
                            <p className="text-muted-foreground mt-1 text-sm">
                                Try adjusting your search or filter to find what
                                you&apos;re looking for.
                            </p>
                        </div>
                    )}
                </section>
            </main>

            {/* Cart Drawer */}
            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </div>
    );
}

export default function Home({ auth, products, categories }: PageProps) {
    return (
        <ShopLayout>
            <CartProvider>
                <ShopContent auth={auth} products={products} categories={categories} />
            </CartProvider>
        </ShopLayout>
    );
}

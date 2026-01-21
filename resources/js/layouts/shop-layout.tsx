import { Head } from '@inertiajs/react';
import React from 'react';

export default function ShopLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Head>
                <title>SwiftCart - Shop Smart, Shop Fast</title>

                <meta
                    name="description"
                    content="Discover amazing products at unbeatable prices. SwiftCart - your one-stop online shopping destination."
                />

                {/* Icons */}
                <link
                    rel="icon"
                    href="/icon-light-32x32.png"
                    media="(prefers-color-scheme: light)"
                />
                <link
                    rel="icon"
                    href="/icon-dark-32x32.png"
                    media="(prefers-color-scheme: dark)"
                />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-icon.png" />
            </Head>
            <div className={`font-sans antialiased`}>
                {children}
            </div>
        </>
    );
}

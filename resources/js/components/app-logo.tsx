import { Link } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex items-center gap-2">
                <div className="bg-accent flex h-8 w-8 items-center justify-center rounded-lg">
                    <ShoppingCart className="text-accent-foreground h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                    <Link href={'/'}>SwiftCart </Link>
                </span>
            </div>
        </>
    );
}

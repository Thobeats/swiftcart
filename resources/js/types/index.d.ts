import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    avatar?:string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    success: string | number | string[];
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    children?: NavItem[];
}

export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
    created_at: string;
    stock_quantity: number;
}

export interface Category {
    name: string;
}

export interface Order {
    id: string;
    orderNo: string;
    customer: string;
    status: string;
    price: number;
    date: string;
}

interface OrderItem {
  id: number | string;
  product_name: string;
  price: number;
  quantity: number;
}

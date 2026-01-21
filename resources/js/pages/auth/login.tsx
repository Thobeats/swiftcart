'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { Lock, Mail } from 'lucide-react';
import React from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('email', 'password', 'remember'),
        });
    };

    return (
        <>
            <Head>
                <title>Sign In</title>
            </Head>
            <div className="bg-background flex flex-col min-h-screen items-center justify-center">
                <div className="border-border bg-card w-full max-w-md rounded-lg border shadow-lg">
                    <div className="border-border flex items-center justify-between border-b p-6">
                        <h2 className="text-2xl font-bold">Welcome back</h2>
                    </div>

                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium"
                                >
                                    EMAIL ADDRESS
                                </Label>
                                <div className="relative">
                                    <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        className="bg-secondary h-12 border-0 pl-10"
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-destructive mt-1 text-sm">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-medium"
                                >
                                    PASSWORD
                                </Label>
                                <div className="relative">
                                    <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        className="bg-secondary h-12 border-0 pl-10"
                                        required
                                    />
                                    {errors.password && (
                                        <p className="text-destructive mt-1 text-sm">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Checkbox
                                        id="remember"
                                        checked={data.remember}
                                        onCheckedChange={(v) =>
                                            setData('remember', Boolean(v))
                                        }
                                        className="mr-2"
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="text-sm"
                                    >
                                        Remember me
                                    </Label>
                                </div>

                                {canResetPassword && (
                                    <a
                                        href="/forgot-password"
                                        className="text-muted-foreground hover:text-foreground text-sm"
                                    >
                                        Forgot password?
                                    </a>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 w-full font-medium"
                            >
                                Sign in
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-muted-foreground text-sm">
                                Don't have an account?{' '}
                                <a
                                    href="/register"
                                    className="text-foreground font-medium underline underline-offset-2 hover:text-gray-400"
                                >
                                    Create account
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-muted-foreground text-sm">
                        <a
                            href={route('home')}
                            className="text-foreground font-medium underline underline-offset-2 hover:text-gray-400"
                        >
                            Back to Shop
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

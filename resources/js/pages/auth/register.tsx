'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { Lock, Mail, User } from 'lucide-react';
import React from 'react';

export default function Register({ registered }: { registered: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />

            {!registered ? (
                <div className="bg-background border-border mx-auto mt-25 max-w-md rounded-lg border shadow-sm">
                    <div className="p-6">
                        <h1 className="mb-6 text-2xl font-bold">
                            Create account
                        </h1>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label
                                    htmlFor="name"
                                    className="text-sm font-medium"
                                >
                                    FULL NAME
                                </Label>
                                <div className="relative mt-2">
                                    <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={data.name}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => setData('name', e.target.value)}
                                        className="bg-secondary h-12 border-0 pl-10"
                                        required
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-destructive mt-1 text-sm">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium"
                                >
                                    EMAIL ADDRESS
                                </Label>
                                <div className="relative mt-2">
                                    <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={data.email}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => setData('email', e.target.value)}
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

                            <div>
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-medium"
                                >
                                    PASSWORD
                                </Label>
                                <div className="relative mt-2">
                                    <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={data.password}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            setData('password', e.target.value)
                                        }
                                        className="bg-secondary h-12 border-0 pl-10"
                                        required
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-destructive mt-1 text-sm">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label
                                    htmlFor="password_confirmation"
                                    className="text-sm font-medium"
                                >
                                    CONFIRM PASSWORD
                                </Label>
                                <div className="relative mt-2">
                                    <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        placeholder="Confirm password"
                                        value={data.password_confirmation}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            setData(
                                                'password_confirmation',
                                                e.target.value,
                                            )
                                        }
                                        className="bg-secondary h-12 border-0 pl-10"
                                        required
                                    />
                                </div>
                                {errors.password_confirmation && (
                                    <p className="text-destructive mt-1 text-sm">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <Link
                                    href={route('login')}
                                    className="text-muted-foreground hover:text-foreground text-sm underline"
                                >
                                    Already registered?
                                </Link>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="h-12"
                                >
                                    Create account
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="bg-background border-border mx-auto mt-25 max-w-md rounded-lg border shadow-sm">
                    <div className="p-6">
                        <h1 className="mb-6 text-2xl font-bold">
                            Congratulations, your account has been created, please check your email to verify your account
                        </h1>
                    </div>
                </div>
            )}
            <div className="mt-10 text-center">
                <p className="text-muted-foreground text-sm">
                    <a
                        href={route('home')}
                        className="text-foreground font-medium underline underline-offset-2 hover:text-gray-400"
                    >
                        Back to Shop
                    </a>
                </p>
            </div>
        </>
    );
}

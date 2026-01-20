"use client";

import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Register" />

            <div className="max-w-md mx-auto my-28 bg-background border border-border rounded-lg shadow-sm">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-6">Create account</h1>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Label htmlFor="name" className="text-sm font-medium">
                                FULL NAME
                            </Label>
                            <div className="relative mt-2">
                                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={data.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setData("name", e.target.value)
                                    }
                                    className="pl-10 bg-secondary border-0 h-12"
                                    required
                                />
                            </div>
                            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="email" className="text-sm font-medium">
                                EMAIL ADDRESS
                            </Label>
                            <div className="relative mt-2">
                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={data.email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setData("email", e.target.value)
                                    }
                                    className="pl-10 bg-secondary border-0 h-12"
                                    required
                                />
                            </div>
                            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <Label htmlFor="password" className="text-sm font-medium">
                                PASSWORD
                            </Label>
                            <div className="relative mt-2">
                                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={data.password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setData("password", e.target.value)
                                    }
                                    className="pl-10 bg-secondary border-0 h-12"
                                    required
                                />
                            </div>
                            {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <Label htmlFor="password_confirmation" className="text-sm font-medium">
                                CONFIRM PASSWORD
                            </Label>
                            <div className="relative mt-2">
                                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    placeholder="Confirm password"
                                    value={data.password_confirmation}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setData("password_confirmation", e.target.value)
                                    }
                                    className="pl-10 bg-secondary border-0 h-12"
                                    required
                                />
                            </div>
                            {errors.password_confirmation && (
                                <p className="text-sm text-destructive mt-1">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <Link
                                href={route("login")}
                                className="text-sm text-muted-foreground underline hover:text-foreground"
                            >
                                Already registered?
                            </Link>

                            <Button type="submit" disabled={processing} className="h-12">
                                Create account
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

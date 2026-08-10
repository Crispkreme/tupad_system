import { FormEvent, useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },

                credentials: 'include',

                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data: {
                success?: boolean;
                message?: string;
                user?: {
                    id: number;
                    name: string;
                    email: string;
                };
            } = await response.json();

            if (!response.ok) {
                setError(
                    data.message || 'Invalid email or password.'
                );

                return;
            }

            // Login successful
            window.location.href = '/dashboard';

        } catch (error) {
            console.error(error);

            setError(
                'Unable to connect to the server. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                {/* Logo / Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        TUPAD System
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Household Management System
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-xl shadow-lg p-8">

                    <h2 className="text-2xl font-semibold text-gray-900">
                        Welcome Back
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Sign in to your account
                    </p>

                    {/* Error */}
                    {error && (
                        <div className="mt-6 rounded-lg bg-red-50 border border-red-200 p-4">
                            <p className="text-sm text-red-700">
                                {error}
                            </p>
                        </div>
                    )}

                    <form
                        onSubmit={handleLogin}
                        className="mt-6 space-y-5"
                    >

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="admin@tupad.test"
                                autoComplete="email"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3
                                           focus:border-blue-500 focus:ring-2
                                           focus:ring-blue-200 outline-none"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3
                                           focus:border-blue-500 focus:ring-2
                                           focus:ring-blue-200 outline-none"
                            />
                        </div>

                        {/* Login */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600
                                       px-4 py-3 font-semibold text-white
                                       hover:bg-blue-700
                                       disabled:cursor-not-allowed
                                       disabled:opacity-60
                                       transition"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>

                    </form>

                    {/* Test Account */}
                    <div className="mt-6 rounded-lg bg-gray-50 p-4">
                        <p className="text-xs font-semibold text-gray-600">
                            Test Account
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            admin@tupad.test
                        </p>

                        <p className="text-xs text-gray-500">
                            password123
                        </p>
                    </div>

                </div>

                <p className="mt-6 text-center text-sm text-gray-500">
                    TUPAD Household Management System
                </p>

            </div>
        </div>
    );
}

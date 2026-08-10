import { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserResponse {
    success: boolean;
    user: User;
}

interface HouseholdMember {
    id: number;
    name?: string;
    child_name?: string;
    member_name?: string;
    birth_date?: string;
    age?: number;
    sex?: string;
    civil_status?: string;
}

interface Household {
    id: number;
    father_name?: string;
    mother_name?: string;
    father_occupation?: string;
    mother_occupation?: string;
    home_address?: string;
    family_income?: number | string;
    household_status?: string | string[];
    members?: HouseholdMember[];
}

interface HouseholdResponse {
    success?: boolean;
    data?: Household[];
    households?: Household[];
}

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);

    const [households, setHouseholds] = useState<Household[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingHouseholds, setLoadingHouseholds] =
        useState<boolean>(true);

    const [loggingOut, setLoggingOut] = useState<boolean>(false);

    const [error, setError] = useState<string>('');

    /*
     * Get authenticated user
     */
    async function getUser(): Promise<void> {
        try {
            const response = await fetch('/api/user', {
                method: 'GET',

                headers: {
                    Accept: 'application/json',
                },

                credentials: 'include',
            });

            if (!response.ok) {
                window.location.href = '/login';
                return;
            }

            const data: UserResponse = await response.json();

            setUser(data.user);
        } catch (error) {
            console.error(error);

            window.location.href = '/login';
        } finally {
            setLoading(false);
        }
    }

    /*
     * Get households from your API
     */
    async function getHouseholds(): Promise<void> {
        setLoadingHouseholds(true);
        setError('');

        try {
            const response = await fetch('/api/households', {
                method: 'GET',

                headers: {
                    Accept: 'application/json',
                },

                credentials: 'include',
            });

            if (response.status === 401) {
                window.location.href = '/login';
                return;
            }

            if (!response.ok) {
                throw new Error(
                    `Failed to load households. Status: ${response.status}`
                );
            }

            const data: HouseholdResponse | Household[] =
                await response.json();

            /*
             * Support:
             *
             * {
             *     "data": [...]
             * }
             *
             * OR
             *
             * {
             *     "households": [...]
             * }
             *
             * OR
             *
             * [...]
             */

            if (Array.isArray(data)) {
                setHouseholds(data);
            } else if (Array.isArray(data.data)) {
                setHouseholds(data.data);
            } else if (Array.isArray(data.households)) {
                setHouseholds(data.households);
            } else {
                setHouseholds([]);
            }
        } catch (error) {
            console.error(error);

            setError(
                'Unable to load household data.'
            );
        } finally {
            setLoadingHouseholds(false);
        }
    }

    /*
     * Logout
     */
    async function handleLogout(): Promise<void> {
        setLoggingOut(true);

        try {
            const response = await fetch('/api/logout', {
                method: 'POST',

                headers: {
                    Accept: 'application/json',
                },

                credentials: 'include',
            });

            if (response.ok) {
                window.location.href = '/login';
                return;
            }

            console.error('Logout failed.');
        } catch (error) {
            console.error(error);
        } finally {
            setLoggingOut(false);
        }
    }

    /*
     * Load dashboard data
     */
    useEffect(() => {
        getUser();
        getHouseholds();
    }, []);

    /*
     * Calculate total members
     */
    const totalMembers = households.reduce(
        (total, household) => {
            return total + (household.members?.length ?? 0);
        },
        0
    );

    /*
     * Loading dashboard
     */
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-gray-600">
                    Loading dashboard...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="h-16 flex items-center justify-between">

                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                TUPAD System
                            </h1>

                            <p className="text-xs text-gray-500">
                                Household Management
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">
                                    {user?.name}
                                </p>

                                <p className="text-xs text-gray-500">
                                    {user?.email}
                                </p>
                            </div>

                            <button
                                onClick={handleLogout}
                                disabled={loggingOut}
                                className="rounded-lg bg-red-600 px-4 py-2
                                           text-sm font-medium text-white
                                           hover:bg-red-700
                                           disabled:opacity-60"
                            >
                                {loggingOut
                                    ? 'Logging out...'
                                    : 'Logout'}
                            </button>

                        </div>

                    </div>

                </div>
            </nav>

            {/* Dashboard */}
            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Dashboard
                    </h2>

                    <p className="mt-1 text-gray-600">
                        Welcome back, {user?.name}.
                    </p>
                </div>

                {/* API Error */}
                {error && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                        <p className="text-sm text-red-700">
                            {error}
                        </p>

                        <button
                            onClick={getHouseholds}
                            className="mt-2 text-sm font-medium text-red-700 underline"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Households */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Households
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {loadingHouseholds
                                        ? '...'
                                        : households.length}
                                </p>
                            </div>

                            <div
                                className="w-12 h-12 rounded-lg bg-blue-100
                                           flex items-center justify-center"
                            >
                                <span className="text-xl">
                                    🏠
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Members */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Members
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {loadingHouseholds
                                        ? '...'
                                        : totalMembers}
                                </p>
                            </div>

                            <div
                                className="w-12 h-12 rounded-lg bg-green-100
                                           flex items-center justify-center"
                            >
                                <span className="text-xl">
                                    👨‍👩‍👧‍👦
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Current User */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Current User
                                </p>

                                <p className="mt-2 text-lg font-bold text-gray-900">
                                    {user?.name}
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                    {user?.email}
                                </p>
                            </div>

                            <div
                                className="w-12 h-12 rounded-lg bg-purple-100
                                           flex items-center justify-center"
                            >
                                <span className="text-xl">
                                    👤
                                </span>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Household Preview */}
                <div className="mt-8">

                    <div className="flex items-center justify-between mb-4">

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Recent Households
                            </h3>

                            <p className="text-sm text-gray-500">
                                Data loaded from your Household API
                            </p>
                        </div>

                        <button
                            onClick={getHouseholds}
                            disabled={loadingHouseholds}
                            className="rounded-lg border border-gray-300
                                       bg-white px-4 py-2 text-sm
                                       font-medium text-gray-700
                                       hover:bg-gray-50
                                       disabled:opacity-60"
                        >
                            {loadingHouseholds
                                ? 'Refreshing...'
                                : 'Refresh'}
                        </button>

                    </div>

                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                        {loadingHouseholds ? (
                            <div className="p-8 text-center text-gray-500">
                                Loading households...
                            </div>
                        ) : households.length === 0 ? (
                            <div className="p-8 text-center">

                                <p className="text-gray-500">
                                    No households found.
                                </p>

                                <p className="text-sm text-gray-400 mt-1">
                                    Make sure your household seeder has been run.
                                </p>

                            </div>
                        ) : (
                            <div className="overflow-x-auto">

                                <table className="w-full">

                                    <thead className="bg-gray-50 border-b border-gray-200">

                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                #
                                            </th>

                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Father
                                            </th>

                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Mother
                                            </th>

                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Address
                                            </th>

                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Members
                                            </th>
                                        </tr>

                                    </thead>

                                    <tbody className="divide-y divide-gray-200">

                                        {households
                                            .slice(0, 5)
                                            .map((household) => (
                                                <tr
                                                    key={household.id}
                                                    className="hover:bg-gray-50"
                                                >

                                                    <td className="px-6 py-4 text-sm text-gray-700">
                                                        {household.id}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                        {household.father_name || '—'}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-gray-700">
                                                        {household.mother_name || '—'}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-gray-700">
                                                        {household.home_address || '—'}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-gray-700">
                                                        {household.members?.length ?? 0}
                                                    </td>

                                                </tr>
                                            ))}

                                    </tbody>

                                </table>

                            </div>
                        )}

                    </div>

                </div>

                {/* Quick Actions */}
                <div className="mt-8">

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Quick Actions
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <button
                            onClick={() => {
                                window.location.href = '/households';
                            }}
                            className="bg-white rounded-xl shadow-sm p-6
                                       text-left hover:shadow-md transition"
                        >
                            <h4 className="font-semibold text-gray-900">
                                Household Management
                            </h4>

                            <p className="mt-1 text-sm text-gray-500">
                                View and manage registered households.
                            </p>
                        </button>

                        <button
                            onClick={() => {
                                window.location.href = '/households';
                            }}
                            className="bg-white rounded-xl shadow-sm p-6
                                       text-left hover:shadow-md transition"
                        >
                            <h4 className="font-semibold text-gray-900">
                                Household Members
                            </h4>

                            <p className="mt-1 text-sm text-gray-500">
                                View and manage household members.
                            </p>
                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
}

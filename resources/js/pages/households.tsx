import { FormEvent, useEffect, useMemo, useState } from 'react';

interface HouseholdMember {
    id: number;
    name: string;
    birth_date: string;
    age: number;
    sex: string;
    civil_status: string;
}

interface Household {
    id: number;
    father_name: string;
    mother_name: string;
    father_occupation: string | null;
    mother_occupation: string | null;
    home_address: string;
    family_income: number | string;
    household_status: string | string[];
    members?: HouseholdMember[];
}

interface HouseholdForm {
    father_name: string;
    mother_name: string;
    father_occupation: string;
    mother_occupation: string;
    home_address: string;
    family_income: string;
    household_status: string;
}

interface MemberForm {
    name: string;
    birth_date: string;
    age: string;
    sex: string;
    civil_status: string;
}

interface HouseholdResponse {
    success?: boolean;
    data?: Household[];
    household?: Household;
    message?: string;
}

interface MemberResponse {
    success?: boolean;
    data?: HouseholdMember;
    member?: HouseholdMember;
    message?: string;
}

const emptyHouseholdForm: HouseholdForm = {
    father_name: '',
    mother_name: '',
    father_occupation: '',
    mother_occupation: '',
    home_address: '',
    family_income: '',
    household_status: '',
};

const emptyMemberForm: MemberForm = {
    name: '',
    birth_date: '',
    age: '',
    sex: '',
    civil_status: 'Single',
};

export default function Households() {
    const [households, setHouseholds] = useState<Household[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);

    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const [search, setSearch] = useState<string>('');

    const [showHouseholdModal, setShowHouseholdModal] =
        useState<boolean>(false);

    const [showMemberModal, setShowMemberModal] =
        useState<boolean>(false);

    const [showDetailsModal, setShowDetailsModal] =
        useState<boolean>(false);

    const [editingHousehold, setEditingHousehold] =
        useState<Household | null>(null);

    const [editingMember, setEditingMember] =
        useState<HouseholdMember | null>(null);

    const [selectedHousehold, setSelectedHousehold] =
        useState<Household | null>(null);

    const [householdForm, setHouseholdForm] =
        useState<HouseholdForm>(emptyHouseholdForm);

    const [memberForm, setMemberForm] =
        useState<MemberForm>(emptyMemberForm);

    useEffect(() => {
        getHouseholds();
    }, []);
    /*
    |--------------------------------------------------------------------------
    | Load households
    |--------------------------------------------------------------------------
    */

    async function getHouseholds(): Promise<void> {
        setLoading(true);
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
                    `Unable to load households. Status: ${response.status}`
                );
            }

            const result: HouseholdResponse | Household[] =
                await response.json();

            if (Array.isArray(result)) {
                setHouseholds(result);
            } else if (Array.isArray(result.data)) {
                setHouseholds(result.data);
            } else {
                setHouseholds([]);
            }

        } catch (error) {
            console.error(error);

            setError(
                'Unable to load household records.'
            );
        } finally {
            setLoading(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Create / Update Household
    |--------------------------------------------------------------------------
    */

    async function handleHouseholdSubmit(
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();

        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const url = editingHousehold
                ? `/api/households/${editingHousehold.id}`
                : '/api/households';

            const method = editingHousehold
                ? 'PUT'
                : 'POST';

            const response = await fetch(url, {
                method,

                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },

                credentials: 'include',

                body: JSON.stringify({
                    father_name: householdForm.father_name,
                    mother_name: householdForm.mother_name,
                    father_occupation:
                        householdForm.father_occupation || null,
                    mother_occupation:
                        householdForm.mother_occupation || null,
                    home_address: householdForm.home_address,
                    family_income: householdForm.family_income,
                    household_status:
                        householdForm.household_status,
                }),
            });

            const result: HouseholdResponse =
                await response.json();

            if (response.status === 401) {
                window.location.href = '/login';
                return;
            }

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    'Unable to save household.'
                );
            }

            setSuccess(
                editingHousehold
                    ? 'Household updated successfully.'
                    : 'Household created successfully.'
            );

            closeHouseholdModal();

            await getHouseholds();

        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : 'Unable to save household.'
            );
        } finally {
            setSaving(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Delete Household
    |--------------------------------------------------------------------------
    */

    async function deleteHousehold(
        household: Household
    ): Promise<void> {
        const confirmed = window.confirm(
            `Delete the household of ${household.father_name} and ${household.mother_name}?`
        );

        if (!confirmed) {
            return;
        }

        setDeleting(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch(
                `/api/households/${household.id}`,
                {
                    method: 'DELETE',

                    headers: {
                        Accept: 'application/json',
                    },

                    credentials: 'include',
                }
            );

            if (response.status === 401) {
                window.location.href = '/login';
                return;
            }

            const result: HouseholdResponse =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    'Unable to delete household.'
                );
            }

            setSuccess(
                'Household deleted successfully.'
            );

            await getHouseholds();

        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : 'Unable to delete household.'
            );
        } finally {
            setDeleting(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Create / Update Member
    |--------------------------------------------------------------------------
    */

    async function handleMemberSubmit(
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();

        if (!selectedHousehold) {
            return;
        }

        setSaving(true);
        setError('');
        setSuccess('');

        try {
            let url: string;
            let method: string;

            if (editingMember) {
                url =
                    `/api/households/${selectedHousehold.id}` +
                    `/members/${editingMember.id}`;

                method = 'PUT';
            } else {
                url =
                    `/api/households/${selectedHousehold.id}` +
                    '/members';

                method = 'POST';
            }

            const response = await fetch(url, {
                method,

                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },

                credentials: 'include',

                body: JSON.stringify({
                    name: memberForm.name,
                    birth_date: memberForm.birth_date,
                    age: Number(memberForm.age),
                    sex: memberForm.sex,
                    civil_status: memberForm.civil_status,
                }),
            });

            const result: MemberResponse =
                await response.json();

            if (response.status === 401) {
                window.location.href = '/login';
                return;
            }

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    'Unable to save member.'
                );
            }

            setSuccess(
                editingMember
                    ? 'Member updated successfully.'
                    : 'Member added successfully.'
            );

            closeMemberModal();

            await getHouseholds();

            /*
             * Refresh selected household
             */
            const updatedHousehold =
                await getSingleHousehold(
                    selectedHousehold.id
                );

            if (updatedHousehold) {
                setSelectedHousehold(updatedHousehold);
            }

        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : 'Unable to save member.'
            );
        } finally {
            setSaving(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Get Single Household
    |--------------------------------------------------------------------------
    */

    async function getSingleHousehold(
        id: number
    ): Promise<Household | null> {
        try {
            const response = await fetch(
                `/api/households/${id}`,
                {
                    method: 'GET',

                    headers: {
                        Accept: 'application/json',
                    },

                    credentials: 'include',
                }
            );

            if (!response.ok) {
                return null;
            }

            const result: HouseholdResponse =
                await response.json();

            return result.household ||
                (result.data as Household[] | undefined)?.[0] ||
                null;

        } catch (error) {
            console.error(error);

            return null;
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Delete Member
    |--------------------------------------------------------------------------
    */

    async function deleteMember(
        household: Household,
        member: HouseholdMember
    ): Promise<void> {
        const confirmed = window.confirm(
            `Delete ${member.name} from this household?`
        );

        if (!confirmed) {
            return;
        }

        setDeleting(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch(
                `/api/households/${household.id}/members/${member.id}`,
                {
                    method: 'DELETE',

                    headers: {
                        Accept: 'application/json',
                    },

                    credentials: 'include',
                }
            );

            const result: MemberResponse =
                await response.json();

            if (response.status === 401) {
                window.location.href = '/login';
                return;
            }

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    'Unable to delete member.'
                );
            }

            setSuccess(
                'Member deleted successfully.'
            );

            const updatedHousehold =
                await getSingleHousehold(household.id);

            if (updatedHousehold) {
                setSelectedHousehold(updatedHousehold);
            }

            await getHouseholds();

        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : 'Unable to delete member.'
            );
        } finally {
            setDeleting(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Modal helpers
    |--------------------------------------------------------------------------
    */

    function openCreateHousehold(): void {
        setEditingHousehold(null);
        setHouseholdForm(emptyHouseholdForm);
        setShowHouseholdModal(true);
        setError('');
    }

    function openEditHousehold(
        household: Household
    ): void {
        setEditingHousehold(household);

        setHouseholdForm({
            father_name: household.father_name || '',
            mother_name: household.mother_name || '',
            father_occupation:
                household.father_occupation || '',
            mother_occupation:
                household.mother_occupation || '',
            home_address:
                household.home_address || '',
            family_income:
                String(household.family_income ?? ''),
            household_status:
                Array.isArray(household.household_status)
                    ? household.household_status[0] || ''
                    : household.household_status || '',
        });

        setShowHouseholdModal(true);
        setError('');
    }

    function closeHouseholdModal(): void {
        setShowHouseholdModal(false);
        setEditingHousehold(null);
        setHouseholdForm(emptyHouseholdForm);
    }

    // function openCreateMember(
    //     household: Household
    // ): void {
    //     setSelectedHousehold(household);
    //     setEditingMember(null);
    //     setMemberForm(emptyMemberForm);
    //     setShowMemberModal(true);
    //     setError('');
    // }
    function openCreateMember(household: Household): void {
        setShowDetailsModal(false); // Close Household Details
        setShowMemberModal(true);   // Open Add Member

        setSelectedHousehold(household);
        setEditingMember(null);
        setMemberForm(emptyMemberForm);
        setError('');
    }

    function openEditMember(
        household: Household,
        member: HouseholdMember
    ): void {
        setShowDetailsModal(false);
        setShowMemberModal(true);

        setSelectedHousehold(household);
        setEditingMember(member);

        setMemberForm({
            name: member.name || '',
            birth_date: member.birth_date
                ? member.birth_date.substring(0, 10)
                : '',
            age: String(member.age ?? ''),
            sex: member.sex || '',
            civil_status: member.civil_status || 'single',
        });

        setError('');
    }

    function closeMemberModal(): void {
        setShowMemberModal(false);
        setEditingMember(null);
        setMemberForm(emptyMemberForm);
    }

    async function openHouseholdDetails(
        household: Household
    ): Promise<void> {
        const freshHousehold =
            await getSingleHousehold(household.id);

        setSelectedHousehold(
            freshHousehold || household
        );

        setShowDetailsModal(true);
    }

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    const filteredHouseholds = useMemo(() => {
        const keyword = search
            .toLowerCase()
            .trim();

        if (!keyword) {
            return households;
        }

        return households.filter((household) => {
            return (
                household.father_name
                    ?.toLowerCase()
                    .includes(keyword) ||
                household.mother_name
                    ?.toLowerCase()
                    .includes(keyword) ||
                household.home_address
                    ?.toLowerCase()
                    .includes(keyword)
            );
        });
    }, [households, search]);

    /*
    |--------------------------------------------------------------------------
    | UI
    |--------------------------------------------------------------------------
    */

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

                        <button
                            onClick={() => {
                                window.location.href =
                                    '/dashboard';
                            }}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            ← Dashboard
                        </button>

                    </div>

                </div>
            </nav>

            {/* Main */}
            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Household Management
                        </h2>

                        <p className="mt-1 text-gray-600">
                            Register and manage households and members.
                        </p>
                    </div>

                    <button
                        onClick={openCreateHousehold}
                        className="rounded-lg bg-blue-600 px-5 py-3
                                   text-sm font-semibold text-white
                                   hover:bg-blue-700 transition"
                    >
                        + Add Household
                    </button>

                </div>

                {/* Success */}
                {success && (
                    <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
                        <p className="text-sm text-green-700">
                            {success}
                        </p>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                        <p className="text-sm text-red-700">
                            {error}
                        </p>
                    </div>
                )}

                {/* Search */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6">

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search father, mother, or address..."
                        className="w-full rounded-lg border border-gray-300
                                   px-4 py-3 outline-none
                                   focus:border-blue-500
                                   focus:ring-2 focus:ring-blue-200"
                    />

                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                    {loading ? (
                        <div className="p-12 text-center">
                            <p className="text-gray-500">
                                Loading households...
                            </p>
                        </div>
                    ) : filteredHouseholds.length === 0 ? (
                        <div className="p-12 text-center">

                            <p className="text-lg font-medium text-gray-700">
                                No households found
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Add your first household to get started.
                            </p>

                        </div>
                    ) : (
                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-gray-50 border-b border-gray-200">

                                    <tr>

                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                                            ID
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Father
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Mother
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Address
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Income
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Members
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-200">

                                    {filteredHouseholds.map(
                                        (household) => (
                                            <tr
                                                key={household.id}
                                                className="hover:bg-gray-50"
                                            >

                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    #{household.id}
                                                </td>

                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                    {household.father_name}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {household.mother_name}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                                                    <span className="line-clamp-2">
                                                        {household.home_address}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    ₱
                                                    {Number(
                                                        household.family_income
                                                    ).toLocaleString()}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {household.members?.length ?? 0}
                                                </td>

                                                <td className="px-6 py-4">

                                                    <div className="flex justify-end gap-2">

                                                        <button
                                                            onClick={() =>
                                                                openHouseholdDetails(
                                                                    household
                                                                )
                                                            }
                                                            className="rounded-lg bg-gray-100
                                                                       px-3 py-2 text-xs
                                                                       font-medium text-gray-700
                                                                       hover:bg-gray-200"
                                                        >
                                                            View
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                openEditHousehold(
                                                                    household
                                                                )
                                                            }
                                                            className="rounded-lg bg-blue-100
                                                                       px-3 py-2 text-xs
                                                                       font-medium text-blue-700
                                                                       hover:bg-blue-200"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                deleteHousehold(
                                                                    household
                                                                )
                                                            }
                                                            disabled={deleting}
                                                            className="rounded-lg bg-red-100
                                                                       px-3 py-2 text-xs
                                                                       font-medium text-red-700
                                                                       hover:bg-red-200
                                                                       disabled:opacity-50"
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>

            </main>

            {/* Household Modal */}
            {showHouseholdModal && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

                    <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">

                        <div className="p-6 border-b">

                            <div className="flex items-center justify-between">

                                <h3 className="text-xl font-semibold text-gray-900">
                                    {editingHousehold
                                        ? 'Edit Household'
                                        : 'Add Household'}
                                </h3>

                                <button
                                    onClick={closeHouseholdModal}
                                    className="text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ×
                                </button>

                            </div>

                        </div>

                        <form
                            onSubmit={handleHouseholdSubmit}
                            className="p-6 space-y-5"
                        >

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* Father */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Father's Name
                                    </label>

                                    <input
                                        type="text"
                                        required
                                        value={householdForm.father_name}
                                        onChange={(event) =>
                                            setHouseholdForm({
                                                ...householdForm,
                                                father_name:
                                                    event.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                    />
                                </div>

                                {/* Mother */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mother's Name
                                    </label>

                                    <input
                                        type="text"
                                        required
                                        value={householdForm.mother_name}
                                        onChange={(event) =>
                                            setHouseholdForm({
                                                ...householdForm,
                                                mother_name:
                                                    event.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                    />
                                </div>

                                {/* Father occupation */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Father's Occupation
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            householdForm.father_occupation
                                        }
                                        onChange={(event) =>
                                            setHouseholdForm({
                                                ...householdForm,
                                                father_occupation:
                                                    event.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                    />
                                </div>

                                {/* Mother occupation */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mother's Occupation
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            householdForm.mother_occupation
                                        }
                                        onChange={(event) =>
                                            setHouseholdForm({
                                                ...householdForm,
                                                mother_occupation:
                                                    event.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                    />
                                </div>

                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Home Address
                                </label>

                                <textarea
                                    required
                                    rows={3}
                                    value={
                                        householdForm.home_address
                                    }
                                    onChange={(event) =>
                                        setHouseholdForm({
                                            ...householdForm,
                                            home_address:
                                                event.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* Income */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Family Income
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        required
                                        value={
                                            householdForm.family_income
                                        }
                                        onChange={(event) =>
                                            setHouseholdForm({
                                                ...householdForm,
                                                family_income:
                                                    event.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Household Status
                                    </label>

                                    <select
                                        required
                                        value={
                                            householdForm.household_status
                                        }
                                        onChange={(event) =>
                                            setHouseholdForm({
                                                ...householdForm,
                                                household_status:
                                                    event.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white"
                                    >
                                        <option value="">
                                            Select status
                                        </option>

                                        <option value="rent">
                                            Rent
                                        </option>

                                        <option value="living_with_parent_or_relatives">
                                            Living with Parent/Relatives
                                        </option>

                                        <option value="owned">
                                            Owned
                                        </option>

                                        <option value="other">
                                            Other
                                        </option>

                                    </select>
                                </div>

                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-4">

                                <button
                                    type="button"
                                    onClick={closeHouseholdModal}
                                    className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {saving
                                        ? 'Saving...'
                                        : editingHousehold
                                            ? 'Update Household'
                                            : 'Save Household'}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

            {/* Member Modal */}
            {showMemberModal && selectedHousehold && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

                    <div className="w-full max-w-lg bg-white rounded-xl shadow-xl">

                        <div className="p-6 border-b">

                            <div className="flex items-center justify-between">

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {editingMember
                                            ? 'Edit Member'
                                            : 'Add Member'}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {selectedHousehold.father_name}
                                        {' / '}
                                        {selectedHousehold.mother_name}
                                    </p>
                                </div>

                                <button
                                    onClick={closeMemberModal}
                                    className="text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ×
                                </button>

                            </div>

                        </div>

                        <form
                            onSubmit={handleMemberSubmit}
                            className="p-6 space-y-5"
                        >

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name of Child / Member
                                </label>

                                <input
                                    type="text"
                                    required
                                    value={memberForm.name}
                                    onChange={(event) =>
                                        setMemberForm({
                                            ...memberForm,
                                            name: event.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                />
                            </div>

                            {/* Birth date */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Birth Date
                                    </label>

                                    <input
                                        type="date"
                                        required
                                        value={
                                            memberForm.birth_date
                                        }
                                        onChange={(event) =>
                                            setMemberForm({
                                                ...memberForm,
                                                birth_date:
                                                    event.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Age
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        required
                                        value={memberForm.age}
                                        onChange={(event) =>
                                            setMemberForm({
                                                ...memberForm,
                                                age: event.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                    />
                                </div>

                            </div>

                            {/* Sex */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sex
                                </label>

                                <select
                                    required
                                    value={memberForm.sex}
                                    onChange={(event) =>
                                        setMemberForm({
                                            ...memberForm,
                                            sex: event.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white"
                                >
                                    <option value="">
                                        Select sex
                                    </option>

                                    <option value="male">
                                        Male
                                    </option>

                                    <option value="female">
                                        Female
                                    </option>

                                </select>
                            </div>

                            {/* Civil status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Civil Status
                                </label>

                                <select
                                    required
                                    value={
                                        memberForm.civil_status
                                    }
                                    onChange={(event) =>
                                        setMemberForm({
                                            ...memberForm,
                                            civil_status:
                                                event.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white"
                                >
                                    <option value="single">
                                        Single
                                    </option>

                                    <option value="married">
                                        Married
                                    </option>

                                    <option value="widowed">
                                        Widowed
                                    </option>   

                                    <option value="separated">
                                        Separated
                                    </option>

                                    <option value="divorced">
                                        Divorced
                                    </option>

                                </select>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">

                                <button
                                    type="button"
                                    onClick={closeMemberModal}
                                    className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {saving
                                        ? 'Saving...'
                                        : editingMember
                                            ? 'Update Member'
                                            : 'Add Member'}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

            {/* Household Details Modal */}
            {showDetailsModal && selectedHousehold && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

                    <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">

                        <div className="p-6 border-b">

                            <div className="flex items-center justify-between">

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        Household Details
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Household #{selectedHousehold.id}
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        setShowDetailsModal(false)
                                    }
                                    className="text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ×
                                </button>

                            </div>

                        </div>

                        <div className="p-6">

                            {/* Household Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <p className="text-xs text-gray-500 uppercase">
                                        Father
                                    </p>

                                    <p className="mt-1 font-medium text-gray-900">
                                        {selectedHousehold.father_name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 uppercase">
                                        Mother
                                    </p>

                                    <p className="mt-1 font-medium text-gray-900">
                                        {selectedHousehold.mother_name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 uppercase">
                                        Father's Occupation
                                    </p>

                                    <p className="mt-1 text-gray-900">
                                        {selectedHousehold.father_occupation || '—'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 uppercase">
                                        Mother's Occupation
                                    </p>

                                    <p className="mt-1 text-gray-900">
                                        {selectedHousehold.mother_occupation || '—'}
                                    </p>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="text-xs text-gray-500 uppercase">
                                        Home Address
                                    </p>

                                    <p className="mt-1 text-gray-900">
                                        {selectedHousehold.home_address}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 uppercase">
                                        Family Income
                                    </p>

                                    <p className="mt-1 text-gray-900">
                                        ₱
                                        {Number(
                                            selectedHousehold.family_income
                                        ).toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 uppercase">
                                        Household Status
                                    </p>

                                    <p className="mt-1 text-gray-900">
                                        {Array.isArray(
                                            selectedHousehold.household_status
                                        )
                                            ? selectedHousehold.household_status.join(
                                                ', '
                                            )
                                            : selectedHousehold.household_status}
                                    </p>
                                </div>

                            </div>

                            {/* Members */}
                            <div className="mt-8">

                                <div className="flex items-center justify-between mb-4">

                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">
                                            Household Members
                                        </h4>

                                        <p className="text-sm text-gray-500">
                                            {selectedHousehold.members?.length ?? 0}
                                            {' '}
                                            member(s)
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            openCreateMember(
                                                selectedHousehold
                                            )
                                        }
                                        className="rounded-lg bg-green-600
                                                   px-4 py-2 text-sm
                                                   font-medium text-white
                                                   hover:bg-green-700"
                                    >
                                        + Add Member
                                    </button>

                                </div>

                                {selectedHousehold.members &&
                                selectedHousehold.members.length > 0 ? (
                                    <div className="overflow-x-auto border rounded-lg">

                                        <table className="w-full">

                                            <thead className="bg-gray-50">

                                                <tr>

                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                                                        Name
                                                    </th>

                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                                                        Birth Date
                                                    </th>

                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                                                        Age
                                                    </th>

                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                                                        Sex
                                                    </th>

                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                                                        Civil Status
                                                    </th>

                                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                                                        Actions
                                                    </th>

                                                </tr>

                                            </thead>

                                            <tbody className="divide-y">

                                                {selectedHousehold.members.map(
                                                    (member) => (
                                                        <tr
                                                            key={member.id}
                                                        >

                                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                                {member.name}
                                                            </td>

                                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                                {member.birth_date
                                                                ? new Date(member.birth_date).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                })
                                                                : '—'}
                                                            </td>

                                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                                {member.age}
                                                            </td>

                                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                                {member.sex
                                                                ? member.sex.charAt(0).toUpperCase() +
                                                                member.sex.slice(1)
                                                                : '—'}
                                                            </td>

                                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                                {member.civil_status
                                                                ? member.civil_status.charAt(0).toUpperCase() +
                                                                member.civil_status.slice(1)
                                                                : '—'}
                                                            </td>

                                                            <td className="px-4 py-3">

                                                                <div className="flex justify-end gap-2">

                                                                    <button
                                                                        onClick={() =>
                                                                            openEditMember(
                                                                                selectedHousehold,
                                                                                member
                                                                            )
                                                                        }
                                                                        className="text-xs font-medium text-blue-600 hover:underline"
                                                                    >
                                                                        Edit
                                                                    </button>

                                                                    <button
                                                                        onClick={() =>
                                                                            deleteMember(
                                                                                selectedHousehold,
                                                                                member
                                                                            )
                                                                        }
                                                                        disabled={deleting}
                                                                        className="text-xs font-medium text-red-600 hover:underline disabled:opacity-50"
                                                                    >
                                                                        Delete
                                                                    </button>

                                                                </div>

                                                            </td>

                                                        </tr>
                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>
                                ) : (
                                    <div className="rounded-lg border border-dashed p-8 text-center">

                                        <p className="text-gray-500">
                                            No members registered yet.
                                        </p>

                                        <button
                                            onClick={() =>
                                                openCreateMember(
                                                    selectedHousehold
                                                )
                                            }
                                            className="mt-3 text-sm font-medium text-blue-600 hover:underline"
                                        >
                                            Add the first member
                                        </button>

                                    </div>
                                )}

                            </div>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Edit',
        href: '/users',
    },
];

export default function Edit({ user, userRoles, roles }) {
    const { data, setData, errors, put } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        roles: userRoles || [],
    });

    function handleCheckboxChange(roleName, checked) {
        if (checked) {
            setData('roles', [...data.roles, roleName]);
        } else {
            setData(
                'roles',
                data.roles.filter((name) => name !== roleName),
            );
        }
    }

    function submit(e: any) {
        e.preventDefault();
        put(route('users.update', user.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users Edit" />
            <div>
                <Link
                    className="mr-2 cursor-pointer rounded bg-blue-500 px-3 py-2 text-xs font-medium text-white hover:bg-blue-600"
                    href={route('users.index')}
                >
                    Back
                </Link>
            </div>
            <div className="p-3">
                <form onSubmit={submit} className="mx-auto max-w-md space-y-4 rounded-lg bg-white p-6 shadow">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            name="name"
                            placeholder="Enter your name"
                            className="focus:ring-opacity-50 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500"> {errors.name}</p>}
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            name="email"
                            placeholder="Enter your email"
                            className="focus:ring-opacity-50 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500"> {errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            name="password"
                            placeholder="Enter your password"
                            className="focus:ring-opacity-50 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-500"> {errors.password}</p>}
                    </div>

                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                            Roles
                        </label>
                        {roles.map((role) => (
                            <label key={role.id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 rounded text-blue-600 focus:ring-2"
                                    value={role}
                                    checked={data.roles.includes(role)}
                                    id={role}
                                    onChange={(e) => handleCheckboxChange(role, e.target.checked)}
                                />
                                <span className="text-gray-800 capitalize">{role}</span>
                            </label>
                        ))}
                        {errors.permissions && <p className="mt-1 text-sm text-red-500"> {errors.name}</p>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}

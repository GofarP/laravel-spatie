import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function Edit({ role, rolesPermissions, permissions }) {
    const { data, setData, errors, put } = useForm({
        name: role.name || '',
        permissions: rolesPermissions || [],
    });

    function handleCheckboxChange(permissionName, checked) {
        if (checked) {
            setData('permissions', [...data.permissions, permissionName]);
        } else {
            setData(
                'permissions',
                data.permissions.filter((name) => name !== permissionName),
            );
        }
    }

    function submit(e: any) {
        e.preventDefault();
        put(route('roles.update', role.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles Edit" />
            <div>
                <Link
                    className="mr-2 cursor-pointer rounded bg-blue-500 px-3 py-2 text-xs font-medium text-white hover:bg-blue-600"
                    href={route('roles.index')}
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
                            placeholder="Enter roles name"
                            className="focus:ring-opacity-50 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500"> {errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                            Permission {data.permissions}
                        </label>
                        {permissions.map((permission) => (
                            <label key={permission} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 rounded text-blue-600 focus:ring-1 focus:ring-2"
                                    value={permission}
                                    checked={data.permissions.includes(permission)}
                                    id={permission}
                                    onChange={(e) => handleCheckboxChange(permission, e.target.checked)}
                                />
                                <span className="text-gray-800 capitalize">{permission}</span>
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

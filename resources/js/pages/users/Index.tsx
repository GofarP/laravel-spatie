import AppLayout from '@/layouts/app-layout';
import { can, canAny } from '@/lib/can';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    users: User[];
}

export default function Users({ users }: Props) {
    function handleDelete(id) {
        if (confirm('Are you sure you want to remove this')) {
            router.delete(route('users.destroy', id));
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            {/* Header with Add User button */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                {can('users.create') && (
                    <Link
                        href={route('users.create')}
                        className="mr-3 rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Add User
                    </Link>
                )}
            </div>

            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Roles</th>
                        {canAny(['users.view', 'users.edit', 'users.delete']) && (
                            <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {users.map(({ id, name, email, roles }) => (
                        <tr key={id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{id}</td>
                            <td className="border border-gray-300 px-4 py-2">{name}</td>
                            <td className="border border-gray-300 px-4 py-2">{email}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {roles.map((role) => (
                                    <span key={role.id} className="mr-1 bg-green-100 text-xs font-medium text-green-800">
                                        {role.name}
                                    </span>
                                ))}
                            </td>

                            {canAny(['users.view', 'users.create', 'users.edit']) && (
                                <td className="border border-gray-300 px-4 py-2">
                                    {can('users.view') && (
                                        <Link
                                            href={route('users.show', id)}
                                            className="mr-2 cursor-pointer rounded bg-blue-500 px-3 py-2 text-xs font-medium text-white hover:bg-blue-600"
                                        >
                                            Show
                                        </Link>
                                    )}
                                    {can('users.edit') && (
                                        <Link
                                            href={route('users.edit', id)}
                                            className="mr-2 cursor-pointer rounded bg-yellow-500 px-3 py-2 text-xs font-medium text-white hover:bg-yellow-600"
                                        >
                                            Edit
                                        </Link>
                                    )}

                                    {can('users.delete') && (
                                        <Button
                                            onClick={() => handleDelete(id)}
                                            href={route('users.destroy', id)}
                                            className="cursor-pointer rounded bg-red-500 px-3 py-2 text-xs font-medium text-white hover:bg-red-600"
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </AppLayout>
    );
}

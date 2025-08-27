import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Users({ users }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div>
                <Link
                    href={route('users.create')}
                    className="mr-2 cursor-pointer rounded bg-blue-500 px-3 py-2 text-xs font-medium text-white hover:bg-blue-600"
                >
                    Create
                </Link>
            </div>
            <div className="p-3">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(({ id, name, email }) => (
                                <tr key={id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{email}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <Link href={route('users.edit',id)} className="mr-2 cursor-pointer rounded bg-yellow-500 px-3 py-2 text-xs font-medium text-white hover:bg-yellow-600">
                                            Edit
                                        </Link>
                                        <Link className="cursor-pointer rounded bg-red-500 px-3 py-2 text-xs font-medium text-white hover:bg-red-600">
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}

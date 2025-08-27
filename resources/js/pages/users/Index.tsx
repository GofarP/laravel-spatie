import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
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
    return (
        <table className="w-full table-auto border-collapse border border-gray-300">
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
                            <Link
                                href={route('users.edit', id)}
                                className="mr-2 cursor-pointer rounded bg-yellow-500 px-3 py-2 text-xs font-medium text-white hover:bg-yellow-600"
                            >
                                Edit
                            </Link>
                            <Link
                                href={route('users.destroy', id)}
                                method="delete"
                                as="button"
                                className="cursor-pointer rounded bg-red-500 px-3 py-2 text-xs font-medium text-white hover:bg-red-600"
                            >
                                Delete
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

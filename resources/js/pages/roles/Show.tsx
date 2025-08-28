import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function Edit({ role, permissions }) {
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
            <div>
                <p>
                    <strong>Name:</strong>
                    {role.name}
                </p>
                <p>
                    <strong>Permissions:</strong>
                </p>
                {permissions.map((permission) => (
                    <span key={permission.id} className="mr-1 bg-green-100 text-xs font-medium text-green-800">
                        {permission}
                    </span>
                ))}
            </div>
        </AppLayout>
    );
}

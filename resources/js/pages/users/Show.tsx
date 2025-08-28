import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Show',
        href: '/users',
    },
];

export default function Show({user}) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users Show" />
            <div>
                <Link
                    className="mr-2 cursor-pointer rounded bg-blue-500 px-3 py-2 text-xs font-medium text-white hover:bg-blue-600"
                    href={route('users.index')}
                >
                    Back
                </Link>
            </div>
            <div>
                <p><strong>Name:</strong>{user.name}</p>
                <p><strong>Email:</strong>{user.email}</p>
            </div>
        </AppLayout>
    );
}

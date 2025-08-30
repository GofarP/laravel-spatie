import { usePage } from "@inertiajs/react";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";

// definisi tipe props auth
interface AuthProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
        permissions: string[];
        roles: string[]
    };
}

export type PageProps = InertiaPageProps & AuthProps;

// helper function (bisa dipanggil di mana saja dalam komponen React)

function useAuth() {
    return usePage<PageProps & AuthProps>().props.auth
}

export function can(permission: string): boolean {
    const { auth } = usePage<PageProps>().props;
    return auth.permissions.includes(permission);
}

export function canAny(permissions: string[]): boolean {
    const { auth } = usePage<PageProps>().props;
    return permissions.some(p => auth.permissions.includes(p));
}

export function canAll(permissions: string[]): boolean {
    const { auth } = usePage<PageProps>().props;
    return permissions.every(p => auth.permissions.includes(p))
}

export function hasRole(role: string): boolean {
    const auth = useAuth();
    return auth.roles.includes(role);
}

export function hasAnyRole(roles: string[]): boolean {
    const auth = useAuth();
    return roles.some((r) => auth.roles.includes(r));
}

export function hasAllRoles(roles:string[]):boolean{
    const auth=useAuth();
    return roles.every((r)=>auth.roles.includes(r));
}


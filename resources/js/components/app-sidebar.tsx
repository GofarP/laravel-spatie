import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { BookOpen, Folder, LayoutGrid, Notebook, UsersRound } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Link } from '@inertiajs/react';
import AppLogo from './app-logo';
import { can } from '@/lib/can';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
        permissions: [],
    },
    {
        title: 'Users',
        href: '/users',
        icon: UsersRound,
        permissions: ['users.view'],
    },
    {
        title: 'Roles',
        href: '/roles',
        icon: Notebook,
        permissions: ['roles.view'],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
        permissions: [],
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
        permissions: [],
    },
];

export function AppSidebar() {

    const filteredMainNavItems = mainNavItems.filter(
        (item) =>
            !item.permissions?.length ||
            item.permissions.some((perm) => can(perm))
    );

    const filteredFooterNavItems = footerNavItems.filter(
        (item) =>
            !item.permissions?.length ||
            item.permissions.some((perm) => can(perm))
    );

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredMainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={filteredFooterNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

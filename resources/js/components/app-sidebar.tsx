import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
        BookOpen,
        Folder,
        LayoutGrid,
        Settings,
        Home,
        Users,
        User,
        UserCog2Icon,
        Shield,
        List,
        ShoppingCart,
        BookUser,
        LucideUserRoundSearch,
        Warehouse,
        CircleDollarSign,
        UserSquare,
        FileInput,
        FilePlus2Icon,
        FileCheck2,
        LockKeyhole,
        } from 'lucide-react';
import AppLogo from './app-logo';
import { LucideIcon } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: Home,
    },

    // Basic Settings
    {
        title: 'Basic Settings',
        icon: Settings,
        children: [
            {
                title: 'Company Information',
                href: '/c_info',
                icon: Shield,
            },

            {
                title: 'User Role',
                href: '/user_roles',
                icon: Users,
            },

            {
                title: 'Role Menu Settings',
                href: '/role_menu_settings',
                icon: UserCog2Icon,
            },

            {
                title: 'User Management',
                href: '/user_managements',
                icon: User,
            },

            {
                title: 'Commodity Category',
                href: '/commodity_categories',
                icon: List,
            },

            {
                title: 'Commodity Management',
                href: '/commodity_managements',
                icon: ShoppingCart,
            },

            {
                title: 'Supplier Information',
                href: '/supplier_informations',
                icon: LucideUserRoundSearch,
            },

            {
                title: 'Warehouse Setting',
                href: '/warehouse_settings',
                icon: Warehouse,
            },

            {
                title: 'Owner Information',
                href: '/owner_informations',
                icon: BookUser,
            },

            {
                title: 'Freight Setting',
                href: '/freight_settings',
                icon: CircleDollarSign,
            },

            {
                title: 'Customer Information',
                href: '/customer_informations',
                icon: UserSquare,
            },
        ],
    },

    {
        title: 'Receiving Management',
        href: '/receiving_managements',
        icon: Home,
    },

    {
        title: 'Stock Management',
        href: '/stock_managements',
        icon: Home,
    },


    // Warehouse Working
    {
        title: 'Warehouse Working',
        icon: Warehouse,
        children: [
            {
                title: 'Warehouse Processing',
                href: '/warehouse_processings',
                icon: Warehouse,
            },

            {
                title: 'Inventory Move',
                href: '/inventory_moves',
                icon: FileInput,
            },

            {
                title: 'Inventory Freeze',
                href: '/inventory_freezes',
                icon: LockKeyhole,
            },

            {
                title: 'Inventory Adjust',
                href: '/inventory_adjusts',
                icon: FilePlus2Icon,
            },

            {
                title: 'Inventory Take',
                href: '/inventory_takes',
                icon: FileCheck2,
            },
        ],
    },

    {
        title: 'Delivery Management',
        href: '/delivery_managements',
        icon: ShoppingCart,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },

];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

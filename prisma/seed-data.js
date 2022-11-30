const SeedData = {
    roles: [
        {
            name: 'Admin',
            slug: 'admin',
        },
        {
            name: 'User',
            slug: 'user',
        },
        {
            name: 'VA Pilot',
            slug: 'va-pilot'
        },
        {
            name: 'VA Dispatcher',
            slug: 'va-dispatcher'
        },
        {
            name: 'VA Owner',
            slug: 'va-owner'
        },
        {
            name: 'VA Shareholder',
            slug: 'va-shareholder'
        },
    ],
    menus: [
        {
            slug: 'main-menu',
            name: 'Main Menu',
            order: 0,
            adminOnly: false,
            isRemovable: false,
            isDisabled: false,
            isAuthRequired: true,
            items: [
                {
                    slug: 'home',
                    name: 'Home',
                    href: '/',
                    label: 'Home',
                    isAuthRequired: false,
                    adminOnly: false,
                },
                {
                    slug: 'dashboard',
                    name: 'Dashboard',
                    href: '/dashboard',
                    label: 'Dashboard',
                    isAuthRequired: true,
                    adminOnly: false,
                },
                {
                    slug: 'va',
                    name: 'VA',
                    href: '/va',
                    label: 'VA',
                    isAuthRequired: true,
                    isDisabled: false,
                    adminOnly: false,
                }
            ]
        },
        {
            slug: 'admin-menu',
            name: 'Admin Menu',
            order: 0,
            adminOnly: true,
            isRemovable: false,
            isDisabled: false,
            isAuthRequired: true,
            items: [
                {
                    slug: 'manage-users',
                    name: 'Manage Users',
                    href: '/admin/users',
                    label: 'Manage Users',
                    isAuthRequired: true,
                    adminOnly: true,
                },
                {
                    slug: 'manage-menus',
                    name: 'Manage Menus',
                    href: '/admin/menus',
                    label: 'Manage Menus',
                    isAuthRequired: true,
                    adminOnly: true,
                },
                {
                    slug: 'config',
                    name: 'Config',
                    href: '/admin/config',
                    label: 'Config',
                    isAuthRequired: true,
                    adminOnly: true,
                },
            ]
        }
    ]
}

module.exports = SeedData
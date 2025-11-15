export interface Route {
    path: string;
    name: string;
    public?: boolean;
    group?: string;
    subRoutes?: Route[];
}
    
export const adminRoutes = [
    {
        path: '/admin/user',
        name: 'user',
        public: false,
        group: 'admin',
        subRoutes: [
            {
                path: '/admin/user/create',
                name: 'create user',
                public: false,
                group: 'admin',
            }
        ]
    },
    {
        path: '/admin/posts',
        name: 'posts',
        public: false,
        subRoutes: [
            {
                path: '/admin/posts/create',
                name: 'create post',
                public: false,
            }
        ]
    }
] as Route[];


export const mainRoutes = [
    {
        path: '/',
        name: 'home',
        public: true,
    },
    {
        path: '/blog',
        name: 'blog',
        public: true,
    },
    {
        path: '/admin',
        name: 'admin',
        public: false,
        subRoutes: adminRoutes
    },
    
] as Route[];
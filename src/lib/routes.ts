export interface Route {
    path: string;
    name: string;
    subRoutes?: Route[];
}
    
export const adminRoutes = [
    {
        path: '/admin/user',
        name: 'user',
    },
    {
        path: '/admin/posts',
        name: 'posts',
    }
] as Route[];



export const mainRoutes = [
    {
        path: '/',
        name: 'home',
    },
    {
        path: '/blog',
        name: 'blog',
    },
    {
        path: '/admin',
        name: 'admin',
        subRoutes: adminRoutes
    }
] as Route[];
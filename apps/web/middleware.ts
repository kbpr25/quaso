import { auth } from './auth';

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { pathname } = req.nextUrl;

    // Protect dashboard routes — redirect to login if not authenticated
    if (pathname.startsWith('/dashboard') && !isLoggedIn) {
        return Response.redirect(new URL('/login', req.nextUrl));
    }

    // Redirect authenticated users away from login page
    if (pathname === '/login' && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', req.nextUrl));
    }
});

export const config = {
    matcher: ['/dashboard/:path*', '/login'],
};

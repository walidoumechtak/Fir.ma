/**
 * An array of routes that are accessible to the public
 * These routes do not require the user to be authenticated
 * @type {string[]}
 */
export const publicRoutes: string[] = ['/', '/new-verification']

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = [
  '/login',
  '/register',
  // '/reset',
  '/error',
  // '/new-password',
  // '/new-password/[uidb64]/[token]'
]

/**
 * The prefix for api authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth'

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/settings'

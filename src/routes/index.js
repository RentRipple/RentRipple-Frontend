/* Route declarations for the app */

import * as reviews from '../views'

const routData = [
    {
        id:"0",
        path: '/',
        component: reviews.Home,
        requiresAuth: true,
    },
    {
        id:"1",
        path: '/login',
        component: reviews.Login,
        requiresAuth: true,
    },
    {
        id:"2",
        path: '/register',
        component: reviews.Register,
        requiresAuth: true,
    }
];

export default routData;

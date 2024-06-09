/* Route declarations for the app */

import * as reviews from '../views'
import LoginLayout from "../layout/loginLayout";
import HomeLayout from "../layout/homeLayout";

const routData = [
    {
        id:"0",
        path: '/',
        component: reviews.Home,
        layout: HomeLayout,
        // guard: true,
        exact: true,
    },
    {
        id:"1",
        path: '/login',
        component: reviews.Login,
        layout: LoginLayout,
        exact: true,
    },
    {
        id:"2",
        path: '/register',
        component: reviews.Register,
        layout: LoginLayout,
        exact: true,
    },

    {
        id:"0",
        path: "/404",
        component: reviews.NotFound,
        exact: true,
      },
    //   {
    //     component: () => <Redirect to="/404" />,
    //   },
];

export default routData;

/* Route declarations for the app */

import * as reviews from "../views";
import LoginLayout from "../layout/loginLayout";
import HomeLayout from "../layout/homeLayout";
import GeneralLayout from "../layout/generalLayout";

const routData = [
  {
    id: "0",
    path: "/",
    component: reviews.Home,
    layout: HomeLayout,
    exact: true,
  },
  {
    id: "1",
    path: "/login",
    component: reviews.Login,
    layout: LoginLayout,
    // guard: true,
    exact: true,
  },
  {
    id: "2",
    path: "/register",
    component: reviews.Register,
    layout: LoginLayout,
    // guard: true,
    exact: true,
  },
  {
    id:"3",
    path: '/forgotpassword',
    component: reviews.ForgotPassword,
    layout: LoginLayout,
    exact: true,
},

  {
    id: "4",
    path: "/property-details/:propertyId",
    component: reviews.PropertyDetails,
    guard: true,
    layout: GeneralLayout,
    exact: true,
  },

  {
    id: "5",
    path: "/Profile",
    component: reviews.Profile,
    layout: HomeLayout,
    exact: true,
  },

  {
    id: "6",
    path: "/add-property",
    component: reviews.AddProperty,
    layout: HomeLayout,
  },
  {
    id: "7",
    path: "/chat",
    component: reviews.Chat,
    layout: HomeLayout,
  },

  {
    id: "0",
    path: "/404",
    component: reviews.NotFound,
    exact: true,
  },
  //   {
  //     component: () => <Redirect to="/404" />,
  //   },
];

export default routData;

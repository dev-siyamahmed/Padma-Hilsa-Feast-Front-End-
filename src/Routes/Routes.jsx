import { createBrowserRouter } from "react-router-dom";
import Main_Layout from "../MainLayout/Main_Layout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import RestaurantDetails from "../Pages/Restaurant/RestaurantDetails";
import CategoryDetails from "../Pages/CategorySection/CategoryDetails ";
import Dashboard_Layout from "../MainLayout/Dashboard_Layout";
import OtpVerification from "../Pages/Auth/OtpVerification";
import CreateRestaurant from "../Components/Restaurants/CreateRestaurant";
import RestaurantsList from "../Components/Restaurants/RestaurantsList";
import Profile from "../Components/Profile/Profile";
import Orders from "../Components/Order/Orders";
import FoodList from "../Components/Food/FoodList";



const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main_Layout />,
        errorElement: <div> Error Now </div>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/restaurant/:id",
                element: <RestaurantDetails />
            },
            {
                path: "/category/:categoryName",
                element: <CategoryDetails />
            },

            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/otp-verification",
                element: <OtpVerification />
            },
            {
                path: "/login",
                element: <Login />
            },

        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard_Layout />,
        children: [
            { path: "/dashboard", element: <Profile/> },
            { path: "/dashboard/order", element: <Orders/> },
            { path: "/dashboard/food", element: <FoodList/> },
            { path: "/dashboard/create/restaurant", element: <CreateRestaurant /> },
            { path: "/dashboard/restaurant/list", element: <RestaurantsList /> },
        ],
    },
])

export default Routes;
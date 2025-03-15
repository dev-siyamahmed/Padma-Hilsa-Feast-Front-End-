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
import FoodList from "../Components/Food/FoodList";
import CartList from "../Components/Cart/CartList";
import OrderSuccess from "../Components/OrderSuccess/OrderSuccess";
import UserOrders from "../Components/Order/UserOrders";
import AdminOrders from "../Components/Order/AdminOrders";



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
                path: "/cart",
                element: <CartList />
            },
            {
                path: "/order-success",
                element: <OrderSuccess />
            },
            {
                path: "/cart",
                element: <CartList />
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
            { path: "/dashboard/admin/orders", element: <AdminOrders/> },
            { path: "/dashboard/user/orders", element: <UserOrders/> },
            { path: "/dashboard/food", element: <FoodList/> },
            { path: "/dashboard/create/restaurant", element: <CreateRestaurant /> },
            { path: "/dashboard/restaurant/list", element: <RestaurantsList /> },
        ],
    },
])

export default Routes;
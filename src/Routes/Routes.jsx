import { createBrowserRouter } from "react-router-dom";
import Main_Layout from "../MainLayout/Main_Layout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import RestaurantDetails from "../Pages/Restaurant/RestaurantDetails";
import CategoryDetails from "../Pages/CategorySection/CategoryDetails ";
import Coffee from "../Pages/Food/Coffee";



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
                path: "/food/coffee",
                element: <Coffee />
            },

            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },

        ]
    }
])

export default Routes;
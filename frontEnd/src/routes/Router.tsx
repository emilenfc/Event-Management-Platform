import Userdashboard from "../pages/Userdashboard"
import App from "../App"
import { createBrowserRouter } from "react-router-dom"
import Events from "../pages/Events"
import Home from "../pages/Home"
import Login from "../pages/login"
import Register from "@/pages/register"
import Booking from "@/pages/Booking"

export const Router = createBrowserRouter([

    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "", element: <Home />
            },
                {path: "userDashboard", element: <Userdashboard />},
            { path: "events", element: <Events /> },
             { path: "booking", element: <Booking /> }   
                
      
        ],
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    }
])
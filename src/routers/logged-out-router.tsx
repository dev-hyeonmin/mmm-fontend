import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/404";
import { CreateAccount } from "../pages/create-account";
import { Login } from "../pages/login";
import '../styles/login.css'

const routes = [
    {
        path: "/",
        component: <Login />,
    },
    {
        path: "/create-account",
        component: <CreateAccount />,
    },
];
export const LoggedOutRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component} />
                ))}
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
}
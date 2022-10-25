import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/404";
import { Headers } from "../components/header";
import { Main } from "../pages/main";
import { VerifyEmail } from "../pages/verify-email";
import { EditProfile } from "../pages/edit-profile";

const routes = [
    {
        path: "/",
        component: <Main />
    },
    {
        path: "/confirm",
        component: <VerifyEmail />
    },
    {
        path: "/edit-profile",
        component: <EditProfile />
    }
];

export const LoggedInRouter = () => {
    return (
        <BrowserRouter>
            <Headers />

            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component} />
                ))}
                
                <Route path="/*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
}
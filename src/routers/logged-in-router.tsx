import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/404";
import { Headers } from "../components/header";
import { Main } from "../pages/main";
import { VerifyEmail } from "../pages/verify-email";

const routes = [
    {
        path: "/*",
        component: <Main />,
        useHeader: true,
    },
    {
        path: "/confirm",
        component: <VerifyEmail />,
        useHeader: false,
    },
];

export const LoggedInRouter = () => {
    const pathname = window.location.pathname;
    
    return (
        <BrowserRouter>
            <Headers />

            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component} />
                ))}
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
}
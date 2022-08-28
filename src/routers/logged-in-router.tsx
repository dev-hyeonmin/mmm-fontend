import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/404";
import { EditProfile } from "../pages/edit-profile";
import { Header } from "../pages/layouts/header";
import { Main } from "../pages/main";

const routes = [
    {
        path: "/",
        component: <Main />
    },
    {
        path: "/edit-profile",
        component: <EditProfile />
    }
];

export const LoggedInRouter = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component} />
                ))}
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
}
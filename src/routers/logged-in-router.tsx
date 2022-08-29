import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { NotFound } from "../pages/404";
import { Header } from "../components/header";
import { Main } from "../pages/main";

const routes = [
    {
        path: "/",
        component: <Main />,
        useHeader: true,
    },
];

export const LoggedInRouter = () => {
    const pathname = window.location.pathname;
    const [useHeader, setUserHeader] = useState(true);
    useEffect(() => {
        const findVaildRoute = routes.find((element) => element.path === pathname);
        
        if (!findVaildRoute) {
            setUserHeader(false);
        } else {
            setUserHeader(findVaildRoute.useHeader);
        }
    }, []);
    
    return (
        <BrowserRouter>
            {useHeader && <Header />}
            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component} />
                ))}
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
}
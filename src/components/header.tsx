import { Link, useNavigate } from "react-router-dom";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { useMe } from "../hooks/useMe";

export const Header = () => {
    const navigation = useNavigate();

    const { } = useMe();
    const logout = () => {
        localStorage.removeItem(LOCALSTORAGE_TOKEN);
        navigation("/");
    };
    return (
        <div>
            <button onClick={logout}>Logout</button>
            <div className="tag-verifiy_email">
                ✉️&nbsp;&nbsp;Please verify your email.
            </div>
        </div>
    );
}

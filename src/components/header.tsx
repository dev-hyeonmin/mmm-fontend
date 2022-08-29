import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";

export const Header = () => {
    const { } = useMe();
    return (
        <div className="verifiy-email">
            ✉️&nbsp;&nbsp;Please verify your email.
        </div>
    );
}

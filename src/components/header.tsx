import { gql, useQuery } from "@apollo/client";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { useMe } from "../hooks/useMe";

export const Header = () => {
    const { data: userData } = useMe();    

    const logout = () => {
        localStorage.removeItem(LOCALSTORAGE_TOKEN);
        isLoggedInVar(false);
        authTokenVar('');
    };
    return (
        <div>
            <button onClick={logout}>Logout</button>

            {!userData?.me.verified &&
                <div className="tag-verifiy_email">
                    ✉️&nbsp;&nbsp;Please verify your email.
                </div>
            }
        </div>
    );
}

import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { useMe } from "../hooks/useMe";
import styled from "styled-components";

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    padding: 0 50px;
    box-sizing: border-box;
`;

const Logo = styled.span`
    font-size: 22px;
    font-weight: 500;
`;

const Logout = styled.button`
    line-height: 30px;
    padding: 0 15px;
    background-color: #7A4495;
    color: #fff;
    border-radius: 20px;
`;

const VerifiedMemo = styled.div`
    background-color: #C9BBCF;
    color: #fff;
    text-align: center;
    line-height: 30px;
`;

export const Headers = () => {
    const { data: userData } = useMe();    

    const logout = () => {
        localStorage.removeItem(LOCALSTORAGE_TOKEN);
        isLoggedInVar(false);
        authTokenVar('');
    };

    return (
        <>
            {!userData?.me.verified &&
                <VerifiedMemo>✉️&nbsp;&nbsp;Please verify your email.</VerifiedMemo>
            }

            <Header>
                <Logo>m._.m</Logo>
                <Logout onClick={logout}>Logout</Logout>
            </Header>
        </>
    );
}

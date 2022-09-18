import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { useMe } from "../hooks/useMe";
import styled from "styled-components";
import { useState } from "react";
// @ts-ignore
import searchImg from "../images/search.png";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "./userProfile";

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

const Search = styled.input`
    width: 130px;
    margin-right: 10px;
    font-size: 12px;
    background-image: url(${searchImg});
    background-size: 14px;
    background-position: 107px center;
    background-repeat: no-repeat;
    padding: 0 23px 0 5px;
`;

export const Headers = () => {
    const { data: userData } = useMe();    
    const [keyword, setKeyword] = useState('');
    const navigation = useNavigate();
    
    const logout = () => {
        localStorage.removeItem(LOCALSTORAGE_TOKEN);
        isLoggedInVar(false);
        authTokenVar('');
        navigation("/");
    };

    const onChange = (event: any) => {
        setKeyword(event.target.value);        
    };


    const onKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            if (keyword) {
                navigation({
                    pathname: '/',
                    search: `?term=${keyword}` 
                });                
            } else {
                navigation({
                    pathname: '/'
                });
            }

        }
    }
    return (
        <>
            {!userData?.me.verified &&
                <VerifiedMemo>✉️&nbsp;&nbsp;Please verify your email.</VerifiedMemo>
            }

            <Header>
                <Logo>m._.m</Logo>

                <div>
                    <Search
                        placeholder="search memo"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                    />

                    {userData?.me.name &&
                        <UserProfile />
                    }
                </div>
            </Header>
        </>
    );
}

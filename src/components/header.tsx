import { useMe } from "../hooks/useMe";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "./userProfile";
// @ts-ignore
import searchImg from "../images/search.png";

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 90px;  
    padding: 0 50px;
    box-sizing: border-box;

    @media screen and (max-width: 1023px) {
        padding: 0 10px;
    }
`;

const Logo = styled.span`
    font-size: 22px;
    font-weight: bold;
    color: #66367F;
`;

const VerifiedMemo = styled.div`
    background-color: #C9BBCF;
    color: #fff;
    text-align: center;
    line-height: 30px;
`;

const Search = styled.input`
    width: 150px;
    margin-right: 10px;
    font-size: 12px;    
    padding: 0 0 0 30px;
    border-radius: 5px;
    background-image: url(${searchImg});
    background-size: 14px;
    background-position: 7px center;
    background-repeat: no-repeat;

    &::placeholder {
        color: #555;
        font-weight: 400;
    }
`;

export const Headers = () => {
    const { data: userData } = useMe();
    const [keyword, setKeyword] = useState('');
    const navigation = useNavigate();
    
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
            window.location.reload();
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
                        placeholder="Search"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                    />

                    {userData?.me.name &&
                        <UserProfile userData={userData.me}/>
                    }
                </div>
            </Header>
        </>
    );
}

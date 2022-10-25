import { useMe } from "../hooks/useMe";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "./userProfile";
// @ts-ignore
import searchImg from "../images/search.png";
import { motion } from "framer-motion";

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

const AdminNotice = styled(motion.div)`
    position: absolute;
    left: 130px;
    overflow: hidden;
    white-space: nowrap;
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
                <AdminNotice
                    key="adminNotice"
                    initial={{ width: "0px" }}
                    animate={{ width: "-webkit-fit-content" }}
                    transition={{ repeat: Infinity, duration: 2, repeatDelay: 4 }}                    
                >
                    📌 에디터가 추가되었어요!
                </AdminNotice>
                
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

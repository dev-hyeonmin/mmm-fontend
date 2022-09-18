import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { useMe } from "../hooks/useMe";
import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Logout = styled.button`
    line-height: 30px;
    padding: 0 15px;
    background-color: #7A4495;
    color: #fff;
    border-radius: 20px;
`;

const CUserProfile = styled.div`
    position: relative;
    float: right;
    width: 36px;
    height: 36px;
    line-height: 34px;
    background-color: #ddd;
    border-radius: 20px;
    text-align: center;
    font-size: 24px;
    margin: 6px 0 0 5px;
    cursor: pointer;
`
const ProfileMenu = styled.ul`
    position: absolute;
    top: 60px;
    right: 10px;
    width: 250px;
    z-index: 99;
    background-color: #fff;
    box-shadow: 0px 10px 50px rgba(0,0,0,0.1);
    border-radius: 10px;

    &:before {
        content: '';
        position: absolute;
        top: -9px;
        right: 33px;
        width: 0;
        height: 0;
        transform: translateX(-50%);
        border-right: 12px solid transparent;
        border-bottom: 12px solid #fff;
        border-left: 12px solid transparent;
    }

    li {
        a {
            display: block;
            line-height: 50px;
            padding: 0 32px;
            cursor: pointer;
            color: #6e6d7a;
            transition: all 0.2s ease;
            font-size: 14px;
            text-decoration: none;

            &:hover {
                background-color: #fafafa;
                color: #000;
            }
        }
    }
`;

export const UserProfile = () => {
    const { data: userData } = useMe();    
    const [toggleProfileMenu, setToggleProfileMenu] = useState(false);
    const navigation = useNavigate();
    
    const logout = () => {
        localStorage.removeItem(LOCALSTORAGE_TOKEN);
        isLoggedInVar(false);
        authTokenVar('');
        navigation("/");
    };

    const setProfileMenuStatus = () => {
        setToggleProfileMenu((current) => !current);
    };

    return (
        <>
            {userData?.me.name &&
                <>
                <CUserProfile onClick={setProfileMenuStatus}>{userData?.me.name.substr(0, 1)}</CUserProfile>

                {toggleProfileMenu &&
                <ProfileMenu>
                    <li><Link to='edit-profile'>Edit Profile</Link></li>
                    <li><a onClick={logout}>Logout</a></li>
                </ProfileMenu>
                }
                </>
            }
        </>
    );
}

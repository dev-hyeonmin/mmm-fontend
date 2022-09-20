import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { useMe } from "../hooks/useMe";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { acceptInvitation } from "../__generated__/acceptInvitation";
import { myInvitationQuery, myInvitationQuery_myInvitation } from "../__generated__/myInvitationQuery";
import { Invitation } from "./invitation";

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
`;
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

        &:nth-child(3) {
            font-size: 12px;
            margin: 0 32px;
            font-weight: bold;
            border-top: 1px solid #ddd;
        }
    }
`;
const Notice = styled.div`
    position: absolute;
    width: 11px;
    height: 11px;
    top: 1px;
    right: 0;
    text-align: center;
    background-color: #7A4495;
    color: #fff;
    border-radius: 6px;
    z-index: 9;
`;

const MYINVITATION_QUERY = gql`
    query myInvitationQuery {
        myInvitation {
            invitations {
                groupId,
                userId,
                group {
                    title
                    user {
                        name
                    }
                },
            }
        }
    }
`;

const ACCEPT_INVITATION_SUBSCRIPTION = gql`
    subscription acceptInvitation {
        acceptInvitation {
            invitation {
                groupId,
                userId,
                accept
            }
        }
    }
`;

export const UserProfile = () => {
    const { data: userData } = useMe();
    const [toggleProfileMenu, setToggleProfileMenu] = useState(false);
    const navigation = useNavigate();
    const { data: invitationData, refetch } = useQuery<myInvitationQuery, myInvitationQuery_myInvitation>(MYINVITATION_QUERY);
    const { data: subscriptionData } = useSubscription<acceptInvitation>(ACCEPT_INVITATION_SUBSCRIPTION);
    
    useEffect(() => {
        refetch();
    }, [subscriptionData])

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
            {(userData?.me.name && invitationData?.myInvitation.invitations) &&
                <>
                <CUserProfile onClick={setProfileMenuStatus}>
                    {userData?.me.name.substr(0, 1)}
                    {invitationData.myInvitation.invitations.length > 0 &&
                        <Notice />
                    }
                </CUserProfile>
                

                {toggleProfileMenu &&
                    <ProfileMenu>
                        <li><Link to='edit-profile'>Edit Profile</Link></li>
                        <li><a onClick={logout}>Logout</a></li>

                        {invitationData.myInvitation.invitations.length > 0 &&
                            <li>Invitation</li>
                        }
                        {invitationData.myInvitation.invitations.map((invitation) => 
                            <Invitation
                                key={invitation.groupId}
                                userId={invitation.userId}
                                groupId={invitation.groupId}
                                title={invitation.group.title}
                                invitedUserName={invitation.group.user.name}
                            />
                        )}
                    </ProfileMenu>
                }
                </>
            }
        </>
    );
}

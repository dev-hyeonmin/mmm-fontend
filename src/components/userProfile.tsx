import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { acceptInvitation } from "../__generated__/acceptInvitation";
import { myInvitationQuery, myInvitationQuery_myInvitation } from "../__generated__/myInvitationQuery";
import { Invitation } from "./invitation";
import { meQuery_me } from "../__generated__/meQuery";
import { GoBack } from "./goBack";

interface IUserProfileProps {
    userData: meQuery_me;
}
interface IUserImageProps {
    src?: any;
}

const CUserProfile = styled.div<IUserImageProps>`
    position: relative;
    float: right;
    width: 36px;
    height: 36px;
    line-height: 34px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 20px;
    text-align: center;
    font-size: 18px;
    margin: 8px 0 0 5px;
    cursor: pointer;

    background-image: url("${props => props.src ? props.src : ''}");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;
const ProfileMenu = styled.ul`
    position: absolute;
    top: 55px;
    right: 0;
    width: 250px;
    z-index: 99;
    background-color: #fff;
    box-shadow: 0px 10px 50px rgba(0,0,0,0.1);
    border-radius: 10px;

    &:before {
        content: '';
        position: absolute;
        top: -9px;
        right: -5px;
        width: 0;
        height: 0;
        transform: translateX(-50%);
        border-right: 12px solid transparent;
        border-bottom: 12px solid #fff;
        border-left: 12px solid transparent;
    }

    li {
        text-align: left;
        
        a {
            display: block;
            line-height: 50px;
            padding: 0 32px;
            cursor: pointer;
            color: #6e6d7a;
            transition: all 0.2s ease;
            font-size: 14px;
            text-decoration: none;
            text-align: left;

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
const UserImage = styled.span<IUserImageProps>`
    display: inline-block;
    background-image: url(${props => props.src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
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

export const UserProfile: React.FC<IUserProfileProps> = ({userData}) => {
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
            {(userData.name && invitationData?.myInvitation.invitations) &&
                <>
                <CUserProfile onClick={setProfileMenuStatus} src={userData.userImage}>
                    {!userData.userImage &&
                        userData.name.substring(0, 1)
                    }

                    {invitationData.myInvitation.invitations.length > 0 &&
                        <Notice />
                    }

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
                </CUserProfile>            
                </>
            }
        </>
    );
}

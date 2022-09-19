import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { client } from "../apollo";
import { ACCEPTGROUPMEMBER_MUTATION } from "../mutations";
import { acceptGroupMemberMutation, acceptGroupMemberMutationVariables } from "../__generated__/acceptGroupMemberMutation";
import { Button } from "./button";

interface IInvitationProps {
    userId: number;
    groupId: number;
    title: string;
    invitedUserName: string;
}

const CInvitation = styled.li`
    line-height: 16px;
    margin: 0 32px 15px;
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 5px;
    color: #333;
    font-size: 13px;

    .invited-user {
        color: #999;
        font-size: 11px
    }
`;


const Buttons = styled.div`
    margin-top: 10px;

    button {
        width: calc(50% - 3px);
        height: 25px;
        line-height: 23px;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        border-radius: 2px;
        vertical-align: middle;
        font-size: 12px;
        
        &:nth-child(1) {
            background-color:#fff;
            color:#777;
            border: 1px solid #ddd;
        }
        &:nth-child(2) {
            margin-left: 5px;
        }
    }
`;


export const Invitation: React.FC<IInvitationProps> = ({ userId, groupId, title, invitedUserName }) => {
    const [acceptGroupMemberMutation, { loading }] = useMutation<acceptGroupMemberMutation, acceptGroupMemberMutationVariables>(ACCEPTGROUPMEMBER_MUTATION);
    
    const acceptInvitation = (accept: boolean) => {
        if (loading) { return; }

        acceptGroupMemberMutation({
            variables: {
                acceptGroupMemberInput: {
                    groupId,
                    userId,
                    accept
                }
            }
        })
    };

    return (
        <CInvitation>
            {title} <br />
            <div className="invited-user">by. {invitedUserName}</div>

            <Buttons>
                <button type="button" onClick={() => acceptInvitation(false)}>Deny</button>
                <Button
                    actionText="Confirm"
                    onClick={() => acceptInvitation(true)}
                />
            </Buttons>
        </CInvitation>
    );
};
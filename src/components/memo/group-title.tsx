import { gql, useApolloClient, useMutation } from "@apollo/client";
import styled from "styled-components";
import { MemoButton } from "./memo-button";
import { useState } from "react";
import { editMemoGroupMutation, editMemoGroupMutationVariables } from "../../__generated__/editMemoGroupMutation";
import { DELETEMEMOGROUP_MUTATION } from "../../mutations";
import { deleteMemoGroupMutation, deleteMemoGroupMutationVariables } from "../../__generated__/deleteMemoGroupMutation";
import { useSetRecoilState } from "recoil";
import { selectInviteGroupAtom } from "../../atom";
// @ts-ignore
import buttonImg from "../../images/menu.png";
// @ts-ignore
import deleteImg from "../../images/delete.png";
// @ts-ignore
import inviteImg from "../../images/invite.png";


interface IGroupTitleProps {
    groupId: number;
    title: string;
    isOwner: boolean;
}

interface IMenuStyledProps {
    active: boolean;
}


const EDITMEMOGROUP_MUTATION = gql`
    mutation editMemoGroupMutation ($editMemoGroupInput: EditMemoGroupInput!) {
        editMemoGroup(input: $editMemoGroupInput) {
            ok
            error
        }
    }
`;

const CGroupTitle = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    font-size: 14px;
    font-weight: 500;

    input {
        width: calc(100% - 30px);
        border: none;
        background-color: transparent;        
    }
`;

const Buttons = styled.div<IMenuStyledProps>`
    position: absolute;
    top: 47px;
    right: 0;
    display: ${props=>props.active ? "flex" : "none"};
    flex-direction: column;
    z-index: 9;

    button {
        margin-bottom: 2px;
    }
`;

const TitleError = styled.div`
    position: absolute;
    left:0;
    bottom: 0;
    color: ${props => props.theme.colors.error};
    font-size: 12px;
`;

export const GroupTitle: React.FC<IGroupTitleProps> = ({ groupId, title: groupTitle, isOwner }) => {
    const client = useApolloClient();
    const setSelectInviteGroupAtom = useSetRecoilState(selectInviteGroupAtom);
    const [title, setTitle] = useState(groupTitle);
    const [useMemu, setUseMemu] = useState(false);
    const [error, setError] = useState("");
    const onCompleted = (data: editMemoGroupMutation) => {
        const {
            editMemoGroup: { ok, error }
        } = data;
        
        if (ok) {
            client.writeFragment({
                id: `MemoGroup:${groupId}`,
                fragment: gql`
                    fragment editMemoGroup on MemoGroup {
                        title
                    }
                `,
                data: {
                    title
                },
            });
            setError("");
        } else if (error) {
            setError(error);
        }
    };
    
    const [editMemoGroupMutations] = useMutation<editMemoGroupMutation, editMemoGroupMutationVariables>(EDITMEMOGROUP_MUTATION, {
        onCompleted
    });
    const [deleteMemoGroupMutation] = useMutation<deleteMemoGroupMutation, deleteMemoGroupMutationVariables>(DELETEMEMOGROUP_MUTATION);

    const onChange = (event: any) => {
        setTitle(event.target.value);
    };

    const onKeyDown = (event: any) => {        
        if (event.key === 'Enter') {
            editMemoTitle();
        }
    }

    const editMemoTitle = () => {
        editMemoGroupMutations({
            variables: {
                editMemoGroupInput: {
                    id: groupId,
                    title
                }
            },
        });
    };

    const deleteMemoGroup = () => {
        if (!window.confirm('그룹 삭제시, 해당 그룹의 메모들도 함께 삭제됩니다.')) { return; }

        deleteMemoGroupMutation({
            variables: {
                deleteMemoGroupInput: {
                    id: groupId
                }
            }
        });

        client.cache.evict({ id: `MemoGroup:${groupId}` });
    };
    
    const selectInviteGroupMemo = () => {
        setSelectInviteGroupAtom({
            id: groupId
        });
    }

    const toggleMenu = () => {
        setUseMemu((current) => { return !current});
    }

    return (
        <CGroupTitle>
            <input
                type="text"
                name="title"
                value={title}
                onChange={onChange}
                onBlur={editMemoTitle}
                onKeyDown={onKeyDown}
                disabled={isOwner ? false : true}
            />
            <TitleError>{error}</TitleError>

            {isOwner &&
                <MemoButton
                    src={buttonImg}
                    onClick={toggleMenu}
                />
            }

            {isOwner &&
                <Buttons active={useMemu}>
                    <MemoButton src={inviteImg} onClick={selectInviteGroupMemo} />
                    <MemoButton src={deleteImg} onClick={deleteMemoGroup} />
                </Buttons>
            }
        </CGroupTitle>
    )
}
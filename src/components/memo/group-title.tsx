import { gql, useApolloClient, useMutation } from "@apollo/client";
import styled from "styled-components";
import { MemoButton } from "./memo-button";
// @ts-ignore
import buttonImg from "../../images/menu.png";
// @ts-ignore
import deleteImg from "../../images/delete.png";
// @ts-ignore
import addImg from "../../images/add.png";
import { useState } from "react";
import { editMemoGroupMutation, editMemoGroupMutationVariables } from "../../__generated__/editMemoGroupMutation";
import { FormError } from "../form-error";


interface IGroupTitleProps {
    groupId: number;
    title: string;
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
`;

const TitleError = styled.div`
    position: absolute;
    left:0;
    bottom: 0;
    color: ${props => props.theme.colors.error};
    font-size: 12px;
`;

export const GroupTitle: React.FC<IGroupTitleProps> = ({ groupId, title: groupTitle }) => {
    const client = useApolloClient();
    const [title, setTitle] = useState(groupTitle);
    const [useMemu, setUseMemu] = useState(false);
    const [error, setError] = useState(false);
    const onCompleted = (data: editMemoGroupMutation) => {
        const {
            editMemoGroup: {ok, error}
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
            setError(false);
        } else {
            setError(true);
        }
    };
    
    const [editMemoGroupMutations] = useMutation<editMemoGroupMutation, editMemoGroupMutationVariables>(EDITMEMOGROUP_MUTATION, {
        onCompleted
    });

    const onChange = (event: any) => {
        setTitle(event.target.value);
    };

    const onKeyDown = (event: any) => {        
        if (event.key == 'Enter') {
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
            />
            {error && <TitleError>Group title is required.</TitleError>}

            <MemoButton
                src={buttonImg}
                onClick={toggleMenu}
            />

            <Buttons active={useMemu}>
                <MemoButton src={addImg} backgroundSize="14px"/>
                <MemoButton src={deleteImg}/>
            </Buttons>
        </CGroupTitle>
    )
}
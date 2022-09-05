import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import ReactTextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import { DELETEMEMO_MUTATION, EDITMEMO_MUTATION } from "../../mutations";
import { editMemoMutation, editMemoMutationVariables } from "../../__generated__/editMemoMutation";
import { MemoButton } from "./memo-button";
// @ts-ignore
import deleteImg from "../../images/delete-memo.png";
import { deleteMemoMutation, deleteMemoMutationVariables } from "../../__generated__/deleteMemoMutation";
import { client } from "../../apollo";

interface IMemoProps {
    children: never[];
    provided: DraggableProvided;
    id: number;
    content: string;
}

const CMemo = styled.div`
    position: relative;
    width: 100%;
    line-height: 18px;
    border: 1px solid #ededed;
    border-radius: 7px;
    font-size: 14px;
    padding: 20px 15px;
    background-color: #fff;
    color: #2e3238;
    box-shadow: 0px 1px 10px rgba(153, 161, 173,0.05);
    white-space: pre-wrap;

    button {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 20px;
        height: 20px;
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    &:hover button {
        opacity: 1;
    }

    textarea {
        width: 100%;
        line-height: 18px;
        font-size: 14px;
        background-color: #fff;
        color: #2e3238;
        resize: none;
        outline: none;
        border: none;
        margin: 0;
        padding: 0;
        vertical-align: middle;
    }
`;

export const Memo: React.FC<IMemoProps> = ({ provided, id, content: currentContent }) => {
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState(currentContent);
    const onCompleted = () => {
        setEditMode(false);

        client.writeFragment({
            id: `Memo:${id}`,
            fragment: gql`
                fragment editMemo on Memo {
                    content
                }
            `,
            data: {
                content
            },
        });
    }
    const onDeleteCompleted = (data: deleteMemoMutation) => {
        const { deleteMemo: { ok } } = data;

        if (ok) {
            client.cache.evict({ id: `Memo:${id}` });
        }
    }
    const [editMemoMutation] = useMutation<editMemoMutation, editMemoMutationVariables>(EDITMEMO_MUTATION, {
        onCompleted
    });
    const [deleteMemoMutation] = useMutation<deleteMemoMutation, deleteMemoMutationVariables>(DELETEMEMO_MUTATION, {
        onCompleted: onDeleteCompleted
    });

    const onEdit = (event: any) => {
        setEditMode(true);
    };

    const onChange = (event: any) => {
        setContent(event.target.value);        
    };

    const onKeyDown = (event: any) => {
        if (event.ctrlKey === true && event.key === 'Enter') {
            // enter line 
            setContent((currentContent) => `${currentContent}\n`)
        } else if (event.key === 'Enter') {
            editMemo();
        }
    }

    const editMemo = () => {
        editMemoMutation({
            variables: {
                editMemoInput: {
                    id,
                    content: content.replace(/(?:\r\n|\r|\n)/g, '<br/>')
                }
            }
        });
    };
   
    const moveCursor = (event: any) => {
        var temp_value = event.target.value
        event.target.value = ''
        event.target.value = temp_value
    };

    const deleteMemo = (event: any) => {
        event.preventDefault();
        //event.stopPropagation();
        
        if (!window.confirm('Are you sure delete Memo 😧?')) { return; }
        
        deleteMemoMutation({
            variables: {
                deleteMemoInput: {
                    id
                }
            }
        });
    };
    
    return (
        <CMemo
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <MemoButton
                onClick={deleteMemo}
                src={deleteImg}
                backgroundSize="8px"
            />
            {!editMode && <div onClick={onEdit}>{content.replaceAll('<br/>', '\n')}</div> }
            { editMode &&
                <ReactTextareaAutosize
                value={content.replaceAll('<br/>', '\n')}
                onChange={onChange}
                onBlur={editMemo}
                onKeyDown={onKeyDown}
                onFocus={moveCursor}
                autoFocus
                />
            }
        </CMemo>
    )
}
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import ReactTextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import { DELETEMEMO_MUTATION, EDITMEMO_MUTATION } from "../../mutations";
import { editMemoMutation, editMemoMutationVariables } from "../../__generated__/editMemoMutation";
import { MemoButton } from "./memo-button";
import { deleteMemoMutation, deleteMemoMutationVariables } from "../../__generated__/deleteMemoMutation";
import { client } from "../../apollo";
// @ts-ignore
import menuImg from "../../images/menu.png";
// @ts-ignore
import deleteImg from "../../images/delete.png";
// @ts-ignore
import paletteImg from "../../images/color-palette.png";
import { myMemosQuery_myMemos_groups_memos } from "../../__generated__/myMemosQuery";

interface IMemoProps {
    children: never[];
    provided: DraggableProvided;
    memo: myMemosQuery_myMemos_groups_memos;
}

interface ICMemoProps {
    backgroundColor?: string;
}
interface IPaletteProps {
    backgroundColor?: string;
    onClick?: any
}

const CMemo = styled.div<ICMemoProps>`
    position: relative;
    width: 100%;
    line-height: 18px;
    border: 1px solid #ededed;
    border-radius: 7px;
    font-size: 14px;
    padding: 20px 15px;
    background-color: ${props=>props.backgroundColor ? props=>props.backgroundColor : "#000000"};
    color: #2e3238;
    box-shadow: 0px 1px 10px rgba(153, 161, 173,0.05);
    white-space: pre-wrap;

    .memo-menu {
        position: absolute;
        top: 8px;
        right: 8px;
        display: flex;

        button {        
            width: 22px;
            height: 22px;
            margin-left: 1px;
        }
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

const Palette = styled.ul`
    position: absolute;
    top: 25px;
    right: 0;
    width: -webkit-fill-available;
    z-index: 9;
`;

const PaletteColor = styled.li<IPaletteProps>`
    float: left;
    width: 15px;
    height: 15px;
    border-radius: 8px;
    background-color: ${props=>props.backgroundColor ? props=>props.backgroundColor : "#000000"};
    margin: 0 0 2px 2px;
    cursor: pointer;
    border: 1px solid #bbb;
`;

export const Memo: React.FC<IMemoProps> = ({ provided, memo }) => {
    const palette = ["#B7C4CF", "#FFDBA4", "#F2D7D9", "#D3CEDF", "#A2B38B", "#ECB390" ,"#F9F3EE", "#FFFFFF"];
    const [editMode, setEditMode] = useState(false);
    const [useMenu, setUseMenu] = useState(false);
    const [usePalette, setUsePalette] = useState(false);
    const [content, setContent] = useState(memo.content);
    const [memoColor, setMemoColor] = useState(memo.color);
    const onCompleted = () => {
        setEditMode(false);

        client.writeFragment({
            id: `Memo:${memo.id}`,
            fragment: gql`
                fragment editMemo on Memo {
                    content
                    color
                }
            `,
            data: {
                content,
                color: memoColor
            },
        });
    }
    const onDeleteCompleted = (data: deleteMemoMutation) => {
        const { deleteMemo: { ok } } = data;

        if (ok) {
            client.cache.evict({ id: `Memo:${memo.id}` });
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
            setContent((currentContent) => `${currentContent}\n`);
        } else if (event.key === 'Enter') {
            editMemo();
            return;
        }
    }

    const editMemo = () => {
        editMemoMutation({
            variables: {
                editMemoInput: {
                    id: memo.id,
                    content: content.replace(/(?:\r\n|\r|\n)/g, '<br/>'),  
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
                    id: memo.id
                }
            }
        });
    };
    
    const toggleMenu = () => {
        setUseMenu((current) => !current);        
    };

    const togglePalette = () => {
        setUsePalette((current) => !current);
    };

    const setPickColor = (selectColor: string) => {
        setMemoColor(selectColor);
        
        editMemoMutation({
            variables: {
                editMemoInput: {
                    id: memo.id,
                    content: content.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
                    color: selectColor   
                }
            }
        });
    };

    return (
        <CMemo
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            backgroundColor={memoColor ? memoColor : "#FFFFFF"}
        >
            <div className="memo-menu">
                {useMenu &&
                <>
                    <MemoButton
                    onClick={togglePalette}
                    src={paletteImg}
                    backgroundSize="14px"
                    />
                        
                    <MemoButton
                    onClick={deleteMemo}
                    src={deleteImg}
                    backgroundSize="14px"
                    />
                    {usePalette &&
                        <Palette>
                            {palette.map((color) =>
                                <PaletteColor
                                    key={color}
                                    backgroundColor={color}
                                    onClick={() => setPickColor(color)}
                                />
                            )}
                        </Palette>
                    }
                </>
                }

                <MemoButton
                    onClick={toggleMenu}
                    src={menuImg}
                    backgroundSize="10px"
                />
            </div>
            
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
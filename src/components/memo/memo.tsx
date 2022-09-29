import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import { DELETEMEMO_MUTATION, EDITMEMO_MUTATION } from "../../mutations";
import { editMemoMutation, editMemoMutationVariables } from "../../__generated__/editMemoMutation";
import { MemoButton } from "./memo-button";
import { deleteMemoMutation, deleteMemoMutationVariables } from "../../__generated__/deleteMemoMutation";
import { myMemosQuery_myMemos_groups_memos } from "../../__generated__/myMemosQuery";
import { client } from "../../apollo";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectMemoAtom } from "../../atom";
import { motion } from "framer-motion";
import { UseType } from "../../__generated__/globalTypes";
// @ts-ignore
import menuImg from "../../images/menu.png";
// @ts-ignore
import deleteImg from "../../images/delete.png";
// @ts-ignore
import paletteImg from "../../images/color-palette.png";
// @ts-ignore
import zoomOutImg from "../../images/zoom-out.png";


interface IMemoProps {
    memo: myMemosQuery_myMemos_groups_memos;
    useType?: UseType;
    isOwner?: boolean;
}

interface ICMemoProps {
    backgroundcolor?: string;
}

interface IPaletteProps {
    backgroundcolor?: string;
    onClick?: any
}

const CMemo = styled(motion.div)<ICMemoProps>`
    position: relative;
    width: 100%;
    line-height: 18px;
    border: 1px solid #ddd;
    border-radius: 7px;
    font-size: 14px;
    margin-bottom: 3px;
    padding: 20px 15px;
    background-color: ${props=>props.backgroundcolor ? props=>props.backgroundcolor : "#000000"};
    color: #2e3238;
    box-shadow: 0px 1px 10px rgba(153, 161, 173,0.05);
    white-space: pre-wrap;    

    .memo-menu {
        position: absolute;
        top: 8px;
        right: 8px;

        button {
            width: 22px;
            height: 22px;
            margin-left: 1px;
        }
    }
    
    .memo {
        height: 40px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
        font-weight: bold;
    }

    textarea {
        width: 100%;
        height: 100%;
        line-height: 18px;
        font-size: 14px;
        background-color: ${props=>props.backgroundcolor ? props=>props.backgroundcolor : "#000000"};
        color: #2e3238;
        resize: none;
        outline: none;
        border: none;
        margin: 0;
        padding: 0;
        vertical-align: middle;
    }

    & > button {
        position: absolute;
        bottom: 8px;
        right: 8px;
        width: 22px;
        height: 22px;
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
    background-color: ${props=>props.backgroundcolor ? props=>props.backgroundcolor : "#000000"};
    margin: 0 0 2px 2px;
    cursor: pointer;
    border: 1px solid #bbb;
`;

const Date = styled.ul`
    font-size: 12px;
    color: #777;
    margin-top: 10px;
`;

export const Memo: React.FC<IMemoProps> = ({ memo, useType, isOwner }) => {
    let location = useLocation();
    const path = location.pathname;
    const selectedMemo = useRecoilValue(selectMemoAtom);
    const setSelectMemo = useSetRecoilState(selectMemoAtom);
    const palette = ["#B7C4CF", "#FFDBA4", "#F2D7D9", "#D3CEDF", "#A2B38B", "#ECB390", "#F9F3EE", "#FFFFFF"];
    const [editMode, setEditMode] = useState(false);
    const [useMenu, setUseMenu] = useState(false);
    const [usePalette, setUsePalette] = useState(false);
    const [content, setContent] = useState(memo.content);
    const [memoColor, setMemoColor] = useState(memo.color);
    
    useEffect(() => {
        setContent(memo.content);
    }, [memo.content])
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
            if (selectedMemo.id === memo.id) {
                setSelectMemo({
                    __typename: "Memo",
                    id: 0,
                    content: "",
                    color: null,
                    updateAt: ""
                });
            }
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
        //setEditMode(true);
    };

    const onChange = (event: any) => {
        setContent(event.target.value);
    };

    const onKeyDown = (event: any) => {
        if (event.ctrlKey === false && event.key === 'Enter') {
            editMemo();
            event.preventDefault();
        } else if (event.key === 'Enter') {
            setContent((currentContent) => currentContent + "\n");
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

    const selectMemo = () => {
        setSelectMemo({
            ...memo
        });
    }
    return (
        <CMemo backgroundcolor={memoColor ? memoColor : "#FFFFFF"}  onClick={selectMemo}>
            {useType === UseType.Editor &&
                <div className="memo-menu">
                    {useMenu &&
                        <>
                        <MemoButton
                            onClick={togglePalette}
                            src={paletteImg}
                            backgroundSize="14px"
                        />
                            
                        {isOwner &&
                            <MemoButton
                                onClick={deleteMemo}
                                src={deleteImg}
                                backgroundSize="14px"
                            />
                        }
                        {usePalette &&
                            <Palette>
                                {palette.map((color) =>
                                    <PaletteColor
                                        key={color}
                                        backgroundcolor={color}
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
            }
            
            {!editMode &&
                <div className="memo" onClick={onEdit}>{content.replaceAll('<br/>', '\n')}</div>
            }

            {(editMode && path !== '/grid') &&
                <ReactTextareaAutosize
                value={content.replaceAll('<br/>', '\n')}
                onChange={onChange}
                onBlur={editMemo}
                onKeyDown={onKeyDown}
                onFocus={moveCursor}
                autoFocus
                disabled={useType === UseType.Editor ? false : true}
                />
            }
            {(editMode && path === '/grid') &&
                <textarea
                value={content.replaceAll('<br/>', '\n')}
                onChange={onChange}
                onBlur={editMemo}
                onKeyDown={onKeyDown}
                onFocus={moveCursor}
                autoFocus
                disabled={useType === UseType.Editor ? false : true}
                />
            }  
            
            <Date>{memo.updateAt}</Date>
            {/*path === '/grid' &&
                <MemoButton
                    onClick={selectMemo}
                    src={zoomOutImg}
                    backgroundSize="14px"
                />          
        */}  
        </CMemo>
    )
}

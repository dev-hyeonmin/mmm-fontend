import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EDITMEMO_MUTATION } from "../../mutations";
import { editMemoMutation, editMemoMutationVariables } from "../../__generated__/editMemoMutation";
import { client } from "../../apollo";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectMemoAtom } from "../../atom";
import { motion } from "framer-motion";
import { Tags } from "./tags";
import { Editor } from "@toast-ui/react-editor";
import '../../styles/editor.css';
// @ts-ignore
import closeImg from "../../images/delete-memo.png";


interface ISelectedMemo {
    onSaving: any;
}
const CMemo = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 50% !important;
    height: 100%;
    line-height: 24px;
    border-left: 1px solid #ededed;
    font-size: 14px;
    padding: 0 0 80px 0;
    background-color: #fff;
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

    textarea {
        width: 100%;
        height: calc(100% - 60px);
        line-height: 24px;
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

    @media screen and (max-width: 1024px) {
        width: 100% !important;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 9px;
    left: 10px;
    width: 30px;
    height: 30px;
    padding: 10px;
    background-image: url(${closeImg});
    background-repeat: no-repeat;
    background-color: transparent;
    background-position: center;
    background-size: 16px;
    z-index: 9;

    &+div {
        height: 100% !important;
    }
`;

const UpdateDate = styled.div`
    color: #777;
    margin-top: 5px;
    padding: 0 12px;
`;

export const SelectedMemo: React.FC<ISelectedMemo> = ({ onSaving }) => {
    const memo = useRecoilValue(selectMemoAtom);
    const setSelectMemo = useSetRecoilState(selectMemoAtom);
    const [content, setContent] = useState(memo.content);
    const editorRef = React.useRef<Editor>(null);

    useEffect(() => {
        setContent(memo.content);
        editorRef.current?.getInstance().setHTML(memo.content);
    }, [memo]);
    
    const onCompleted = () => {
        console.log(content);
        client.writeFragment({
            id: `Memo:${memo.id}`,
            fragment: gql`
                fragment editMemo on Memo {
                    content
                }
            `,
            data: {
                content
            },
        });

        onSaving();
    }
    
    const [editMemoMutation] = useMutation<editMemoMutation, editMemoMutationVariables>(EDITMEMO_MUTATION, {
        onCompleted
    });

    const onChange = (event: any) => {
        setContent(event.target.value);
    };

    const editMemo = () => {
        editMemoMutation({
            variables: {
                editMemoInput: {
                    id: memo.id,
                    //content: content.replace(/(?:\r\n|\r|\n)/g, '<br/>'),  
                    content: editorRef.current?.getInstance().getHTML()
                }
            }
        });

        if (editorRef.current) {
            setContent(editorRef.current?.getInstance().getHTML());
        }
    };
   
    const moveCursor = (event: any) => {
        var temp_value = event.target.value
        event.target.value = ''
        event.target.value = temp_value
    };

    const closeSelectedMemo = () => {
        setSelectMemo({
            __typename: "Memo",
            id: 0,
            content: "",
            color: null,
            updateAt: "",
            tags: null
        });
    };

    return (
        <>
            {memo.id &&
                <CMemo
                    initial={{ right: "-50%" }}
                    animate={{ right: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <CloseButton onClick={closeSelectedMemo} />
                    {/* <textarea
                        value={content.replaceAll('<br/>', '\n')}
                        onChange={onChange}
                        onBlur={editMemo}
                        onFocus={moveCursor}
                    /> */}

                    <Editor
                        ref={editorRef}
                        placeholder="내용을 입력해주세요."
                        initialEditType="wysiwyg"
                        onBlur={editMemo}
                        usageStatistics={false}
                        toolbarItems={[
                            ['heading', 'bold', 'italic', 'strike'],
                            ['hr', 'quote'],
                            ['ul', 'ol', 'task', 'indent', 'outdent'],
                            ['image', 'link'],
                            ['code', 'codeblock']
                        ]}
                        initialValue={content}
                    ></Editor>

                    <Tags
                        isSelectedMemo={true}
                        memoId={memo.id}
                        tags={memo.tags} />
                    <UpdateDate>{memo.updateAt}</UpdateDate>                    
                </CMemo>
            }
        </>
    )
    
}

import { gql, useApolloClient, useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { alertAtom, selectMemoAtom } from "../../atom";
import { ADDMEMOTAG_MUTATION, DELETEMEMOTAG_MUTATION, MEMOBYID_QUERY, MEMO_FRAGEMENT } from "../../mutations";
import { addMemoTags, addMemoTagsVariables } from "../../__generated__/addMemoTags";
import { myMemosQuery_myMemos_groups_memos_tags } from "../../__generated__/myMemosQuery";
// @ts-ignore
import saveImg from "../../images/save.png";
// @ts-ignore
import closeTagImg from "../../images/tag-close.png";
import { deleteMemoTags, deleteMemoTagsVariables } from "../../__generated__/deleteMemoTags";
import { memoById, memoByIdVariables } from "../../__generated__/memoById";


interface ITags {
    isSelectedMemo: boolean;
    memoId: number;
    tags: myMemosQuery_myMemos_groups_memos_tags[] | null;
}

const CTags = styled.div`
`;

const Tag = styled.ul`
    width: 100%;
    margin-top: 3px;
    
    &:after {
        content: "";
        display: block;
        clear: both;
    }
    li {
        position: relative;
        float: left;
        background-color: #eef0f3;
        background-image: url(${closeTagImg});
        background-repeat: no-repeat;
        background-size: 8px;
        background-position: calc(100% - 5px) center;
        border-radius: 2px;
        padding: 0 20px 0 7px;
        cursor: pointer;
        margin: 0 3px 3px 0;

        &.noDelete {
            padding: 0 7px;
            background-image: none;
        }
    }    
`;

const AddTagInp = styled.li`
    position: absolute;
    top: 0;
    left: 0;
    width: 120px;
    height: 25px;
    background-color: #fff !important;
    background-image: none !important;
    z-index: 99;

    input {
        border: 0;
        height: auto;
        font-weight: bold;
    }
`;

export const Tags: React.FC<ITags> = ({ isSelectedMemo, memoId, tags }) => {
    const client = useApolloClient();
    const [tagName, setTagName] = useState("");
    const [alertNumber, setAlertNumber] = useState(0);
    const setAlertAtom = useSetRecoilState(alertAtom);
    const selectedMemo = useRecoilValue(selectMemoAtom);
    const setMemoAtom = useSetRecoilState(selectMemoAtom);
    const [deleteTagMutation] = useMutation<deleteMemoTags, deleteMemoTagsVariables>(DELETEMEMOTAG_MUTATION);    
    
    const onCompleted = (data: addMemoTags) => {
        if (data.addMemoTags.id) {            
            const tagId = data.addMemoTags.id;
            const copy = JSON.parse(JSON.stringify(selectedMemo));
            const newTags = {
                ...copy,
                ...{
                    tags: [
                        ...copy.tags,
                        {
                            __typename: "MemoTags",
                            tag: {
                                __typename: "Tags",
                                id: tagId,
                                name: tagName,
                            }
                        }
                    ]
                }
            };
            setMemoAtom((curr) => newTags);

            client.writeFragment({
                id: `Memo:${memoId}`,
                fragment: gql`
                    fragment editMemo on Memo {
                        tags {
                            tag {
                                id
                                name
                            }
                        }
                    }
                `,
                data: newTags,
            });
        }
        
        addAlert();
        setTagName("");
    };

    const [addMemoTagsMutation] = useMutation<addMemoTags, addMemoTagsVariables>(ADDMEMOTAG_MUTATION, {
        onCompleted
    });

    const onChange = (event: any) => {
        setTagName(event.target.value);        
    };

    const addMemoTags = (event: any) => {
        if (event.key === 'Enter') {
            addMemoTagsMutation({
                variables: {
                    addMemoTagInput: {
                        memoId,
                        tagId: 0,
                        name: tagName.trim()
                    }
                }
            })
        }
    };

    const addAlert = () => {
        setAlertNumber((current) => current + 1);

        setAlertAtom((currentAlert) =>
            [
                ...currentAlert,
                {
                    id: `saveAlertTags${alertNumber}`,
                    text: "태그가 저장되었습니다 :D",
                    icon: saveImg,
                    show: "true"
                }
            ]
        )
    };

    const deleteTag = (tagId: number) => {
        if (!window.confirm(`👀 태그를 삭제하시겠습니까?`)) { return; }

        deleteTagMutation({
            variables: {
                deleteMemoTagInput: {
                    memoId,
                    tagId
                }
            }
        })
    };

    return (
        <CTags>
            <Tag>
                {tags?.map((tag) => 
                    <li
                        key={tag.tag.id}
                        className={isSelectedMemo ? "" : "noDelete"}
                        onClick={isSelectedMemo ? () => deleteTag(tag.tag.id) : () => {}}
                    >
                        {tag.tag.name}
                    </li>
                )}

                {(isSelectedMemo) &&
                    <AddTagInp>
                        <input 
                            autoFocus
                            onChange={onChange}
                            onKeyDown={addMemoTags}
                            placeholder="+ Add tag"
                            value={tagName} />
                    </AddTagInp>                                
                }
            </Tag>
        </CTags>
    )
}
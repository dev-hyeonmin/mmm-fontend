import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { alertAtom } from "../../atom";
import { ADDMEMOTAG_MUTATION } from "../../mutations";
import { addMemoTags, addMemoTagsVariables } from "../../__generated__/addMemoTags";
import { myMemosQuery_myMemos_groups_memos_tags } from "../../__generated__/myMemosQuery";
// @ts-ignore
import saveImg from "../../images/save.png";


interface ITags {
    isSelectedMemo: boolean;
    memoId: number;
    tags: myMemosQuery_myMemos_groups_memos_tags[] | null;
}

const CTags = styled.div`
    position: relative;
`;

const Tag = styled.ul`
    width: 100%;
    &:after {
        content: "";
        display: block;
        clear: both;
    }
    li {
        float: left;
        background-color: #ededed;
        border-radius: 2px;
        padding: 0 7px;
        cursor: pointer;

        &:nth-child(n+2) {
            margin-left: 3px;
        }

        &.inp {
            background-color: transparent;
        }
    }    
`;

const Inp = styled.input`
    height: 25px;
    background-color: #fff;
    border-radius: 2px;
`;

export const Tags: React.FC<ITags> = ({ isSelectedMemo, memoId, tags }) => {
    const client = useApolloClient();
    const [isEdit, setIsEdit] = useState(false);
    const [tagName, setTagName] = useState("");
    const setAlertAtom = useSetRecoilState(alertAtom);

    const onCompleted = (data: addMemoTags) => {
        addAlert();
    };

    const [addMemoTagsMutation] = useMutation<addMemoTags, addMemoTagsVariables>(ADDMEMOTAG_MUTATION, {
        onCompleted
    });

    const switchEditMode = () => {
        setIsEdit((curr) => !curr);
    }

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
        setAlertAtom((currentAlert) =>
            [
                ...currentAlert,
                {
                    id: `saveAlertTags`,
                    text: "태그가 저장되었습니다 :D",
                    icon: saveImg,
                    show: "true"
                }
            ]
        )
    };

    return (
        <CTags>
            <h6>Tag</h6>

            <Tag onClick={switchEditMode}>
                {tags?.map((tag) => 
                    <li key={tag.tag.id}>{tag.tag.name}</li>
                )}

                {tags?.length == 0 &&
                    <li>+ Add</li>
                }


                {(isEdit && isSelectedMemo) &&
                    <li className="inp">
                        <Inp
                            autoFocus
                            onChange={onChange}
                            onKeyDown={addMemoTags}
                            placeholder="태그 입력후 엔터!"
                            value={tagName} />
                    </li>
                }
            </Tag>
        </CTags>
    )
}
import { myMemosQuery_myMemos_groups } from "../../__generated__/myMemosQuery";
import { Memo } from "../../components/memo/memo";
import { CMemoAddButton, MemoAddButton } from "../../components/memo/memo-add-button";
import styled from "styled-components";
import { EmptyGroup } from "../../components/memo/empty-group";
import { SelectedMemo } from "../../components/memo/selected-memo";
import { useRecoilValue } from "recoil";
import { selectMemoAtom } from "../../atom";
import { useEffect, useState } from "react";
import { UseType } from "../../__generated__/globalTypes";
import { useMe } from "../../hooks/useMe";

interface IMemoByGroupProps {
    groups?: myMemosQuery_myMemos_groups[] | undefined | null;
    createMemoGroup: any;
}

export const MemoByGrid: React.FC<IMemoByGroupProps> = ({ groups, createMemoGroup }) => {  
    const selectedMemo = useRecoilValue(selectMemoAtom);
    const { data: userData } = useMe();

    const myPermission = (group: myMemosQuery_myMemos_groups):UseType => {
        if (group.user.id === userData.me.id) {
            return UseType.Editor;
        } else {
            const myUseTypeInfo = group.members?.find((member) => member.user.id === userData.me.id);
            if (myUseTypeInfo?.useType) {                
                return myUseTypeInfo?.useType;
            }
        }

        return UseType.Viewer;
    }

    return (                  
        <div className="wrapper-memo-grid">
            { (groups) && 
                groups?.map((group) => (
                    group.memos?.map((memo, index) => (
                        <Memo key={index} memo={memo} useType={myPermission(group)} />
                    ))
                ))
            }

            { (groups && groups[0]) &&
                <MemoAddButton groupId={groups[0].id}/>
            }

            { groups?.length === 0 &&
                <EmptyGroup onClick={createMemoGroup} />
            }

            {selectedMemo.id !== 0 && <SelectedMemo />}
        </div>
    );
};
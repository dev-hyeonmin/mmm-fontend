import { myMemosQuery_myMemos_groups } from "../../__generated__/myMemosQuery";
import { Memo } from "../../components/memo/memo";
import { CMemoAddButton, MemoAddButton } from "../../components/memo/memo-add-button";
import styled from "styled-components";
import { EmptyGroup } from "../../components/memo/empty-group";



interface IMemoByGroupProps {
    groups?: myMemosQuery_myMemos_groups[] | undefined | null;
    createMemoGroup: any;
}

const EmptyMemo = styled(CMemoAddButton)`
    padding: 0;
`;

export const MemoByGrid: React.FC<IMemoByGroupProps> = ({ groups, createMemoGroup }) => {  
    return (                  
        <div className="wrapper-memo-grid">
            { (groups) && 
                groups?.map((group) => (
                    group.memos?.map((memo, index) => (
                        <Memo key={index} memo={memo}/>
                    ))
                ))
            }

            { (groups && groups[0]) &&
                <MemoAddButton groupId={groups[0].id}/>
            }

            { groups?.length === 0 &&
                <EmptyGroup onClick={createMemoGroup} />
            }
        </div>
    );
};
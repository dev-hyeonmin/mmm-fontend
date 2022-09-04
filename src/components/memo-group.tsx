import { Draggable, DraggableProvided, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { myMemosQuery_myMemos_groups } from "../__generated__/myMemosQuery";
import { Memo } from "./memo";

interface IMemoGroupProps {
    group: myMemosQuery_myMemos_groups;
}


const CMemoGroup = styled.div`
    max-width: 20%;
    width: 25%;    
    background-color: rgb(234, 235, 239);
    border-radius: 7px;
    padding: 0 20px 20px 20px;

    &:nth-child(n+2) {
        margin-left: 20px;
    }
`;

const GroupTitle = styled.div`
    padding: 22px 0;
    font-size: 14px;
    font-weight: 500;
`;

export const MemoGroup: React.FC<IMemoGroupProps> = ({ group }) => {
    return (
        <CMemoGroup key={group.id}>                                
            <GroupTitle>{group.title}</GroupTitle>
            
            <Droppable droppableId={"" + group.id}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {provided.placeholder}
                        {group.memos?.map( (memo, index1) => (
                            <Draggable key={memo.id} draggableId={"memo" + memo.id} index={index1}>
                                {(provided) => (
                                    <Memo
                                        provided={provided}
                                        content={memo.content}    
                                    >
                                    </Memo>
                                )}                                                    
                            </Draggable>
                        ))}
                    </div>
                )}                                
            </Droppable>
        </CMemoGroup>
    )
}
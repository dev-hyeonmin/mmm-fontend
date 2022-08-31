import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { myMemos, myMemos_myMemos } from "../__generated__/myMemos";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MYMEMOS_QUERY = gql`
    query myMemos {
        myMemos {
            ok
            error
            groups {
                id
                title
                memos {
                    id
                    content
                }
            }
        }
    }
`;

const MemoGroup = styled.div`
    max-width: 20%;
    width: 25%;    

    &:nth-child(n+2) {
        margin-left: 20px;
    }
`;

const GroupTitle = styled.div`
    padding-bottom: 10px;
    font-size: 18px;
    font-weight: 500;
`;

const Memo = styled.div`
    border: 1px solid #ededed;
    border-radius: 5px;
    width: 100%;
    min-height: 120px;
    padding: 10px;

    &:nth-child(n+2) {
        margin-top: 10px;
    }
`;

export const Main = () => {
    const { data: myMemoData, loading } = useQuery<myMemos, myMemos_myMemos>(MYMEMOS_QUERY);
    const onDragEnd = (result: any) => {
        console.log(result);
    };

    return (                  
        <div className="wrapper-memo">
            <DragDropContext onDragEnd={onDragEnd}>
            {
                !loading && 
                <div className="memo-board">
                    {
                        myMemoData?.myMemos.groups?.map((group, index) => (                            
                            <MemoGroup key={group.id}>                                
                                <GroupTitle>{group.title}</GroupTitle>
                                
                                <Droppable droppableId={"group" + group.id}>
                                    {(droppableProvided) => (
                                        <div ref={droppableProvided.innerRef}>
                                            {
                                                group.memos?.map((memo, index1) => (
                                                    <Draggable draggableId={"memo" + memo.id} index={index1} key={index1}>
                                                        {(provided, snapshot) =>
                                                            <div
                                                                ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                          >
                                                            <Memo key={memo.id} ref={provided.innerRef}>
                                                                    {memo.content}
                                                                    {droppableProvided.placeholder}
                                                                </Memo>
                                                            </div>
                                                        }
                                                    </Draggable>
                                                ))
                                            }
                                        </div>
                                    )}                                
                                </Droppable>
                           </MemoGroup>
                        ))
                    }
                </div>
            }
            </DragDropContext>
        </div>
    );
};
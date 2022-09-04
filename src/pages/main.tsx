import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { editMemoMutation, editMemoMutationVariables } from "../__generated__/editMemoMutation";
import { myMemosQuery, myMemosQuery_myMemos, myMemosQuery_myMemos_groups_memos } from "../__generated__/myMemosQuery";
import { MemoGroup } from "../components/memo/memo-group";
import { sortMemoMutation, sortMemoMutationVariables } from "../__generated__/sortMemoMutation";
import { MemoType } from "../__generated__/globalTypes";
import { EmptyGroup } from "../components/memo/empty-group";
import { CREATEMEMOGROUP_MUTATION, DELETEMEMOGROUP_MUTATION, EDITMEMO_MUTATION, SORTEMEMO_MUTATION } from "../mutation";
import { createMemoGroupMutation, createMemoGroupMutationVariables } from "../__generated__/createMemoGroupMutation";
import { deleteMemoGroupMutation, deleteMemoGroupMutationVariables } from "../__generated__/deleteMemoGroupMutation";

const MYMEMOS_QUERY = gql`
    query myMemosQuery {
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

export interface IRangeMemoMutationInput {
    id: number;
    content: string;
    orderby: number;
    groupId?: number;
}

export const Main = () => {
    const client = useApolloClient();
    const { data: myMemoData, loading, refetch } = useQuery<myMemosQuery, myMemosQuery_myMemos>(MYMEMOS_QUERY);
    const [editMemoMutation] = useMutation<editMemoMutation, editMemoMutationVariables>(EDITMEMO_MUTATION);
    const [sortMemoMutation] = useMutation<sortMemoMutation, sortMemoMutationVariables>(SORTEMEMO_MUTATION);
    const [createMemoGroupMutation] = useMutation<createMemoGroupMutation, createMemoGroupMutationVariables>(CREATEMEMOGROUP_MUTATION, {
        onCompleted: () => { refetch(); }
    });    
    
    const reorder = (list: myMemosQuery_myMemos_groups_memos[], startIndex:number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
    };

    const writeSortMemoFragment = (id: string, memos: myMemosQuery_myMemos_groups_memos[]) => {
        client.writeFragment({
            id: `MemoGroup:${id}`,
            fragment: gql`
                fragment VerifiedMemoGroup on MemoGroup {
                    memos {
                        __typename
                        id
                        content
                    }
                }
            `,
            data: {
                memos: memos,
            },
        });
    };

    const sortMemo = (memos: myMemosQuery_myMemos_groups_memos[]) => {
        const reqMemos:MemoType[] = [];
        memos.map((memo, index) => {
            reqMemos.push({
                id: memo.id,
                content: memo.content,
                orderby: index
            })
        });
        sortMemoMutation({
            variables: {
                sortMemoInput: {
                    memos: reqMemos
                }
            }
        });
    };
    
    const onDragEnd = (result: DropResult) => {
        //console.log(result);
        const groups = myMemoData?.myMemos.groups;

        if (!groups) {
            return;
        }
        if (!result.destination) {
            return;
        }

        const { source, destination } = result;
        let destinationMemos = groups.find((group) => group.id === Number(destination.droppableId))?.memos;
        if (!destinationMemos) { return; }

        if (source.droppableId === destination.droppableId) {
            // same group
            const newMemos = reorder(
                destinationMemos,
                source.index,
                destination.index
            );
            
            writeSortMemoFragment(destination.droppableId, newMemos);
            sortMemo(newMemos);
        } else {
            // diff group
            let sourceMemos = groups.find((group) => group.id === Number(source.droppableId))?.memos;            
            const destinationGroupId = Number(destination?.droppableId);
            if (!sourceMemos) { return; }

            const sourceMemo = sourceMemos[source.index];
            sourceMemos = sourceMemos.filter((_, index) => index !== source.index);
            destinationMemos = [
                ...destinationMemos.slice(0, destination.index),
                sourceMemo,
                ...destinationMemos.slice(destination.index)
            ];
            
            writeSortMemoFragment(source.droppableId, sourceMemos);
            writeSortMemoFragment(destination.droppableId, destinationMemos);         
            
            editMemoMutation({
                variables: {
                    editMemoInput: {
                        id: sourceMemo.id,
                        groupId: destinationGroupId
                    }
                }
            });
            sortMemo(destinationMemos);
        }
    };

    const createMemoGroup = () => {
        createMemoGroupMutation({
            variables: {
                createMemoGroupInput: {
                    title: "new group!"
                }
            }
        })
    };   

    return (                  
        <div className="wrapper-memo">        
            { (!loading && myMemoData?.myMemos.groups) && 
                <DragDropContext onDragEnd={onDragEnd}>
                    { myMemoData?.myMemos.groups?.map((group, index) => (                            
                        <MemoGroup
                            key={index}
                            group={group}
                        />
                    ))}

                    {myMemoData?.myMemos.groups?.length < 5 && (
                        <EmptyGroup onClick={createMemoGroup} />
                    )}
                </DragDropContext>
            }
        </div>
    );
};
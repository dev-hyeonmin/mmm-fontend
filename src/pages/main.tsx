import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { editMemoMutation, editMemoMutationVariables } from "../__generated__/editMemoMutation";
import { rangeMemoMutation, rangeMemoMutationVariables } from "../__generated__/rangeMemoMutation";
import { myMemosQuery, myMemosQuery_myMemos } from "../__generated__/myMemosQuery";
import { MemoGroup } from "../components/memo-group";

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

const EDITMEMO_MUTATION = gql`
    mutation editMemoMutation ($editMemoInput: EditMemoInput!) {
        editMemo (input: $editMemoInput) {
            ok
            error
        }
    }
`;

const RANGEMEMO_MUTATION = gql`
    mutation rangeMemoMutation ($rangeMemoInput: RangeMemoInput!) {
        rangeMemo (input: $rangeMemoInput) {
            ok
            error
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
    //const [groups, setGroups] = useState<myMemosQuery_myMemos_groups[]>();

    const { data: myMemoData, loading, refetch } = useQuery<myMemosQuery, myMemosQuery_myMemos>(MYMEMOS_QUERY);
    const [editMemoMutation, { }] = useMutation<editMemoMutation, editMemoMutationVariables>(EDITMEMO_MUTATION);
    const [rangeMemoMutation, { }] = useMutation<rangeMemoMutation, rangeMemoMutationVariables>(RANGEMEMO_MUTATION, {
        onCompleted: () => { refetch(); }
    });    
    
    const onDragEnd = (result: DropResult) => {
        //console.log(result);

        const groups = myMemoData?.myMemos.groups;
        const { source, destination } = result;

        if (!groups || !destination) { return; }

        if (source.droppableId === destination.droppableId) {
            // same group
            const group = groups.find((group) => group.id === Number(destination.droppableId));
            const memos = group?.memos;
            if (!memos) { return; }

            const tempMemos = memos.filter((memo, index) => index != source.index);
            const sourceMemo = memos[source.index];
            
            const newMemos = [
                ...tempMemos.slice(0, destination.index),
                sourceMemo,
                ...tempMemos.slice(destination.index)
            ];

            client.writeFragment({
                id: `MemoGroup:${destination.droppableId}`,
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
                    memos: newMemos,
                },
            });

            const memoIds:number[] = [];
            newMemos.map((memo) => {
                memoIds.push(memo.id);
            });
            rangeMemoMutation({
                variables: {
                    rangeMemoInput: {
                        memoIds
                    }
                }
            });
        } else {
            // diff group
            let sourceMemos = groups.find((group) => group.id === Number(source.droppableId))?.memos;
            let destinationMemos = groups.find((group) => group.id === Number(destination.droppableId))?.memos;
            const destinationGroupId = Number(destination?.droppableId);
            if (!sourceMemos || !destinationMemos) { return; }

            const sourceMemo = sourceMemos[source.index];
            sourceMemos = sourceMemos.filter((_, index) => index !== source.index);
            destinationMemos = [
                ...destinationMemos.slice(0, destination.index),
                sourceMemo,
                ...destinationMemos.slice(destination.index)
            ];
       
            client.cache.modify({
                id: client.cache.identify({ __typename: "MemoGroup", ID: source.droppableId }),
                fields: {
                    memos: () => {
                        return;
                    }
                }
            });

            const memoIds:number[] = [];
            destinationMemos.map((memo) => {
                memoIds.push(memo.id);
            });
            
            editMemoMutation({
                variables: {
                    editMemoInput: {
                        id: sourceMemo.id,
                        groupId: destinationGroupId
                    }
                }
            });

            rangeMemoMutation({
                variables: {
                    rangeMemoInput: {
                        memoIds
                    }
                }
            });
        }
    };

    return (                  
        <div className="wrapper-memo">        
            { !loading && 
                <DragDropContext onDragEnd={onDragEnd}>
                    { myMemoData?.myMemos.groups?.map((group, index) => (                            
                        <MemoGroup
                            key={index}
                            group={group}
                        />
                    ))}
                </DragDropContext>
            }
        </div>
    );
};
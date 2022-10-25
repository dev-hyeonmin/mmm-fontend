import { useLocation } from "react-router-dom";
import { MemoByGroup } from "./memos/memoByGroup";
import { MemoByGrid } from "./memos/memoByGrid";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { myMemosQuery, myMemosQueryVariables, myMemosQuery_myMemos_groups } from "../__generated__/myMemosQuery";
import { useEffect, useState } from "react";
import { createMemoGroupMutation, createMemoGroupMutationVariables } from "../__generated__/createMemoGroupMutation";
import { CREATEMEMOGROUP_MUTATION } from "../mutations";
import { Helmet } from "react-helmet";
import { MemoMenu } from "../components/memo/memo-menu";

export const MYMEMOS_QUERY = gql`
    query myMemosQuery($myMemosInput: MyMemosInput!) {
        myMemos(input: $myMemosInput) {
            ok
            error
            groups {
                id
                title
                user {
                    id
                    name
                    userImage
                }
                memos {
                    id
                    content
                    color
                    updateAt
                    tags {
                        tag {
                            id
                            name
                        }
                    }
                }
                members{
                    useType
                    accept
                    user {
                        id
                        name
                        email
                        userImage
                    }
                }
                tags {
                    id
                    name
                }
            }
        }
    }
`;

export const Main = () => {
    const location = useLocation();
    const path = location.pathname;
    const [, term] = location.search.split("?term=");
    const [myData, setMyData] = useState<myMemosQuery_myMemos_groups[]>();
    
    const onCompleted = (data: myMemosQuery) => {
        if (data.myMemos.ok) {
            if (data.myMemos.groups) {
                setMyData(data.myMemos.groups);
            } else {
                setMyData([]);
            }            
        }
    };

    const [callQuery, { refetch }] = useLazyQuery<myMemosQuery, myMemosQueryVariables>(MYMEMOS_QUERY, {
        onCompleted
    });
    const [createMemoGroupMutation] = useMutation<createMemoGroupMutation, createMemoGroupMutationVariables>(CREATEMEMOGROUP_MUTATION, {
        onCompleted: () => { refetch(); }
    });

    useEffect(() => {
        let keyword = term ? term : "";
        keyword = keyword.includes('%') ? decodeURI(keyword) : keyword;

        callQuery({
            variables: {
                myMemosInput: {
                    keyword
                }
            }
        });
    }, [term]);
    
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
            <Helmet>
                <title>mmm</title>
            </Helmet>
            
            <MemoMenu onClick={createMemoGroup}/>            

            <div className="box-memo">
                { path === '/' && 
                    <MemoByGroup groups={myData} />
                }

                { path === '/grid' && 
                    <MemoByGrid groups={myData} createMemoGroup={createMemoGroup}/>
                }
            </div>            
        </div>
    );
};
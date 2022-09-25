import { useLocation, useNavigate } from "react-router-dom";
import { MemoButton } from "../components/memo/memo-button";
import { MemoByGroup } from "./memos/memoByGroup";
import { MemoByGrid } from "./memos/memoByGrid";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { myMemosQuery, myMemosQueryVariables, myMemosQuery_myMemos_groups } from "../__generated__/myMemosQuery";
import { useEffect, useState } from "react";
import { createMemoGroupMutation, createMemoGroupMutationVariables } from "../__generated__/createMemoGroupMutation";
import { CREATEMEMOGROUP_MUTATION } from "../mutations";
// @ts-ignore
import orderbyImg from "../images/memo-orderby1.png";
// @ts-ignore
import orderbyImg2 from "../images/memo-orderby2.png";
import { Helmet } from "react-helmet";

const MYMEMOS_QUERY = gql`
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
            }
        }
    }
`;

export const Main = () => {
    const navigation = useNavigate();
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
        const keyword = term ? term : "";
        callQuery({
            variables: {
                myMemosInput: {
                    keyword
                }
            }
        });
    }, []);
    
    const createMemoGroup = () => {
        createMemoGroupMutation({
            variables: {
                createMemoGroupInput: {
                    title: "new group!"
                }
            }
        })
    };

    const switchMemoList = (type: string) => {
        navigation(type);
    };
    
    return (                  
        <div className="wrapper-memo">
            <Helmet>
                <title>mmm</title>
            </Helmet>
            <div className="option-menus">
                <MemoButton
                    src={orderbyImg}
                    onClick={() => switchMemoList('/')}
                />
                <MemoButton
                    src={orderbyImg2}
                    onClick={() => switchMemoList('/grid')}
                />
            </div>
            { path === '/' && 
                <MemoByGroup groups={myData} createMemoGroup={createMemoGroup} />
            }

            { path === '/grid' && 
                <MemoByGrid groups={myData} createMemoGroup={createMemoGroup} />
            }
        </div>
    );
};
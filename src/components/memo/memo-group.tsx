import { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useMe } from "../../hooks/useMe";
import { UseType } from "../../__generated__/globalTypes";
import { myMemosQuery_myMemos_groups } from "../../__generated__/myMemosQuery";
import { GroupTitle } from "./group-title";
import { Memo } from "./memo";
import { MemoAddButton } from "./memo-add-button";

interface IMemoGroupProps {
    group: myMemosQuery_myMemos_groups;
}

const CMemoGroup = styled.div`
    max-width: 20%;
    width: 25%;    
    height: calc(100vh - 150px);
    background-color: rgb(234, 235, 239);
    border-radius: 7px;
    padding: 0 20px 20px 20px;

    &:nth-child(n+2) {
        margin-left: 20px;
    }

    > * {
        margin-top: 3px;
    }

    * {
        outline: none;
    }

    @media screen and (max-width: 1023px) {
        width: 100%;
        height: auto;
        max-width: 100%;
        margin-top: 10px;

        &:nth-child(n+2) {
            margin-left: 0;
        }
    }
`;

const Members = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 15px 0 0;    

    div {
        width: 100%;
        color: #666;
        font-size: 12px;
        margin-bottom: 5px;
        padding-left: 2px;
    }
    span {
        line-height: 20px;
        padding: 0 5px;
        background-color: #FCE2DB;
        color: #7A4495;
        font-size: 12px;
        margin: 2px 0 2px 0;
    }
`;

export const MemoGroup: React.FC<IMemoGroupProps> = ({ group }) => {
    const { data: userData } = useMe();
    const [useType, setUseType] = useState(UseType.Viewer);
    useEffect(() => {
        if (group.user.id === userData.me.id) {
            setUseType(UseType.Editor);
        } else {
            const myUseTypeInfo = group.members?.find((member) => member.user.id === userData.me.id);
            if (myUseTypeInfo?.useType) {                
                setUseType(myUseTypeInfo?.useType);
            }
        }
    });

    return (
        <CMemoGroup key={group.id}>
            <GroupTitle
                groupId={group.id}
                title={group.title}   
                useType={useType}
            />

            {useType === UseType.Editor &&
                <MemoAddButton
                    groupId={group.id}
                />
            }
            <Droppable droppableId={"" + group.id}>
                {(provided) => (
                    <div className={group.members ? group.members.length > 0 ? "box-memos has-group" : "box-memos" : "box-memos"}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >                             
                        {group.memos?.map( (memo, index1) => (
                            <Draggable key={memo.id} draggableId={"memo" + memo.id} index={index1}>
                                {(provided) => (
                                    <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    >
                                        <Memo memo={memo} useType={useType} />
                                    </div>
                                )}                                     
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}                                
            </Droppable>

            {group.members && group.members.length > 0 &&
                <Members>
                    <div>members</div>

                    {group.members?.map((member, index) =>
                        <span key={index}>
                            {member.user.name}
                        </span>
                    )}
                </Members>
            }
        </CMemoGroup>
    )
}
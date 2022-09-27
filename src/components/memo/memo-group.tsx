import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useMe } from "../../hooks/useMe";
import { DELETEGROUPMEMBERS_MUTATION } from "../../mutations";
import { deleteGroupMember, deleteGroupMemberVariables } from "../../__generated__/deleteGroupMember";
import { UseType } from "../../__generated__/globalTypes";
import { myMemosQuery_myMemos_groups } from "../../__generated__/myMemosQuery";
import { GroupTitle } from "./group-title";
import { Memo } from "./memo";
import { MemoAddButton } from "./memo-add-button";

interface IMemoGroupProps {
    group: myMemosQuery_myMemos_groups;
}

interface IMember {
    src: string | null;
}

const CMemoGroup = styled.div`
    flex: 0 0 auto;
    max-width: 20%;
    height: calc(100vh - 150px);
    background-color: rgb(234, 235, 239);
    border-radius: 7px;
    padding: 0 20px 20px 20px;
    scroll-snap-align: start;

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
    margin: 15px 0 0;

    .box-name {
        width: 100%;
        color: #666;
        font-size: 12px;
        margin-bottom: 5px;
        padding-left: 2px;
    }

    .member-box {
        white-space: nowrap;
        overflow: auto;
    }
`;

const Member = styled.span<IMember>`
    position: relative;
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    padding: 0 5px;
    color: #7A4495;
    font-size: 12px;
    margin: 2px 2px 2px 0;
    border-radius: 16px;
    text-align: center;
    overflow: hidden;
    background-color: #fff;
    background-image: url(${props => props.src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    &.owner {
        cursor: pointer;
    }

    &.owner:before {
        content: "x";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.6);
        color: #fff;
        text-align: center;
        opacity: 0;            
        transition: all 0.2s ease;
    }

    &.owner:hover:before {
        opacity: 1;
    }
`;
export const MemoGroup: React.FC<IMemoGroupProps> = ({ group }) => {
    const { data: userData } = useMe();
    const [useType, setUseType] = useState(UseType.Viewer);
    const [isOwner, setIsOwner] = useState(false);
    const [deleteGroupMember] = useMutation<deleteGroupMember, deleteGroupMemberVariables>(DELETEGROUPMEMBERS_MUTATION);

    useEffect(() => {
        if (group.user.id === userData.me.id) {
            setUseType(UseType.Editor);
            setIsOwner(true);
        } else {
            const myUseTypeInfo = group.members?.find((member) => member.user.id === userData.me.id);
            if (myUseTypeInfo?.useType) {                
                setUseType(myUseTypeInfo?.useType);
            }
        }
    }, []);

    const deleteMember = (memberId: number, memberName: string) => {
        if (!window.confirm(`Are you sure delete ${memberName} on this group?`)) { return; }

        deleteGroupMember({
            variables: {
                deleteGroupMemberInput: {
                    groupId: group.id,
                    userId: memberId
                }
            }
        });

        group.members?.filter((member) => member.user.id !== memberId);
    }

    return (
        <CMemoGroup key={group.id}>
            <GroupTitle
                groupId={group.id}
                title={group.title}
                isOwner={isOwner}
            />

            {useType === UseType.Editor &&
                <MemoAddButton
                    groupId={group.id}
                />
            }
            <Droppable droppableId={"" + group.id}>
                {(provided) => (
                    <div className={
                        (group.members && group.members.length > 0) ?
                            useType === UseType.Viewer ?
                                "box-memos has-group is-viewer" : "box-memos has-group"
                            : "box-memos"
                        }
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
                                        <Memo memo={memo} useType={useType} isOwner={isOwner} />
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
                    <div className="box-name">members</div>
                    
                    <div className="member-box">
                        <Member src={group.user.userImage}>
                            {group.user.userImage ? "" : group.user.name.substring(0, 1)}
                        </Member>

                        {group.members?.map((member, index) => 
                            member.accept &&
                            <Member
                                key={index}
                                onClick={isOwner ? () => deleteMember(member.user.id, member.user.name) : () => { }}
                                className={isOwner ? "owner" : ""}
                                src={member.user.userImage ? member.user.userImage : null}
                            >
                                {member.user.userImage ? "" : member.user.name.substring(0, 1)}
                            </Member>
                        )}
                    </div>
                </Members>
            }
        </CMemoGroup>
    )
}
import { myMemosQuery_myMemos_groups } from "../../__generated__/myMemosQuery";
import { Memo } from "../../components/memo/memo";
import { EmptyGroup } from "../../components/memo/empty-group";
import { UseType } from "../../__generated__/globalTypes";
import { useMe } from "../../hooks/useMe";

interface IMemoByGroupProps {
    groups?: myMemosQuery_myMemos_groups[] | undefined | null;
    createMemoGroup: any;
}

export const MemoByGrid: React.FC<IMemoByGroupProps> = ({ groups, createMemoGroup }) => {
    const { data: userData } = useMe();

    const myPermission = (group: myMemosQuery_myMemos_groups):any => {
        if (group.user.id === userData.me.id) {
            return {
                userType: UseType.Editor,
                isOwner: true
            };
        } else {
            const myUseTypeInfo = group.members?.find((member) => member.user.id === userData.me.id);
            if (myUseTypeInfo?.useType) {                
                return {
                    userType: UseType.Editor,
                    isOwner: false
                }
            }
        }
    }

    return (                  
        <div className="wrapper-memo-grid">
            { (groups) && 
                groups?.map((group) => (
                    group.memos?.map((memo, index) => {  
                        const getPermission = myPermission(group);
                        return <Memo key={index} memo={memo} useType={getPermission.userType} isOwner={getPermission.isOwner} />
                    })
                ))
            }

            {/* (groups && groups[0]) &&
                <MemoAddButton groupId={groups[0].id}/>
            */}

            { groups?.length === 0 &&
                <EmptyGroup onClick={createMemoGroup} />
            }
        </div>
    );
};
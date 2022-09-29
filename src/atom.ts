import { atom } from "recoil";
import { myMemosQuery_myMemos_groups_memos } from "./__generated__/myMemosQuery";

interface ISelectInviteGroupAtomProps {
    id: number | null;
}

export const selectMemoAtom = atom<myMemosQuery_myMemos_groups_memos>({
    key: "selectMemo",
    default: {
        __typename: "Memo",
        id: 0,
        content: "",
        color: null,
        updateAt: ""
    },
});

export const selectInviteGroupAtom = atom<ISelectInviteGroupAtomProps>({
    key: "selectInviteGroup",
    default: {
        id: null
    },
});
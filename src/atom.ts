import { atom } from "recoil";
import { myMemosQuery_myMemos_groups_memos } from "./__generated__/myMemosQuery";

export const selectMemoAtom = atom<myMemosQuery_myMemos_groups_memos>({
    key: "selectMemo",
    default: {
        __typename: "Memo",
        id: 0,
        content: "",
        color: null
    },
});
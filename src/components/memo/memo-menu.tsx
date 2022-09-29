import styled from "styled-components";

interface IEmptyGroupProps {
    onClick: React.MouseEventHandler;
}

const MenuBar = styled.div`
    display: flex;
    flex-flow: row-reverse;
    background-color: rgb(247, 247, 247);
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing:border- box;
`;

const AddGroupButton = styled.button`
    height: 40px;
    line-height: 38px;
    background-color: #66367F;
    border-radius: 5px;
    padding: 0 15px;
    color: #fff;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

export const MemoMenu: React.FC<IEmptyGroupProps> = ({ onClick }) => {
    return (
        <MenuBar>
            <AddGroupButton onClick={onClick}>
                + Add Group
            </AddGroupButton>
        </MenuBar>
    );
}
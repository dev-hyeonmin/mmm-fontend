import styled from "styled-components";

interface IEmptyGroupProps {
    onClick: React.MouseEventHandler;
}

const CEmptyGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 20%;
    width: 25%;        
    background-color: rgba(234, 235, 239, 0.3);
    border: 1px dashed #bbb;
    border-radius: 7px;
    padding: 20px 20px 20px 20px;
    margin-left: 20px;
    cursor: pointer;

    &:hover {
        background-color: rgba(234, 235, 239, 0.6);
    }
`;

export const EmptyGroup: React.FC<IEmptyGroupProps> = ({ onClick }) => {
    return (
        <CEmptyGroup onClick={onClick}>
            Add Group ✅
        </CEmptyGroup>
    );
}
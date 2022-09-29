import styled from "styled-components";

interface IEmptyGroupProps {
    onClick: React.MouseEventHandler;
}

const CEmptyGroup = styled.div`
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    width: 250px; 
    height: 250px;
    background-color: rgba(234, 235, 239, 0.3);
    border: 1px dashed #bbb;
    border-radius: 7px;
    padding: 20px 20px 20px 20px;
    margin-left: 20px !important;
    cursor: pointer;

    &:hover {
        background-color: rgba(234, 235, 239, 0.6);
    }

    @media screen and (max-width: 1024px) {
        width: 100%;
        max-width: 100%;
        margin-top: 10px;        

        &:nth-child(n+2) {
            margin-left: 0 !important;
        }
    }
`;

export const EmptyGroup: React.FC<IEmptyGroupProps> = ({ onClick }) => {
    return (
        <CEmptyGroup onClick={onClick}>
            Add Group ✅
        </CEmptyGroup>
    );
}
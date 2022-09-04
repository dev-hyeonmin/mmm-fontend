import styled from "styled-components";

const CEmptyGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 20%;
    width: 25%;        
    background-color: rgb(234, 235, 239, 0.3);
    border: 1px dashed #bbb;
    border-radius: 7px;
    padding: 0 20px 20px 20px;
    margin-left: 20px;
    cursor: pointer;

    span {
        opacity: 0.5;
    }

    &:hover {
        span {
            opacity: 1;
        }
    }
`;

export const EmptyGroup = () => {
    return (
        <CEmptyGroup>
            <span>Add Group ✅</span>
        </CEmptyGroup>
    );
}
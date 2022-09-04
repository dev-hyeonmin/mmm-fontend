import { DraggableProvided } from "react-beautiful-dnd";
import styled from "styled-components";

interface IMemoProps {
    children: never[];
    provided: DraggableProvided;
    content: string;
}


const CMemo = styled.div`
    border: 1px solid #ededed;
    border-radius: 7px;
    width: 100%;
    line-height: 18px;
    font-size: 14px;
    padding: 20px 15px;
    background-color: #fff;
    color: #2e3238;
    box-shadow: 0px 1px 10px rgba(153, 161, 173,0.05);

    &:nth-child(n+2) {
        margin-top: 5px;
    }
`;

export const Memo: React.FC<IMemoProps> = ({provided, content}) => {
    return (
        <CMemo
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps} 
        >
            {content}
        </CMemo>
    )
}
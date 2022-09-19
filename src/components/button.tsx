import styled from "styled-components";

interface IButtonProps {
    loading?: boolean;
    canClick?: boolean;
    actionText: string;
    onClick?: any;
}

const Btn = styled.button`
    background-color: ${props => props.theme.colors.dark};
    color: #fff;
    line-height:30px;
    padding: 0 10px;
    transition: background-color 0.2s;

    &:hover {
        background-color: #66367F;
    }

    &.active {
        background-color: #66367F;
    }
`;


export const Button:React.FC<IButtonProps> = ({ canClick, loading, actionText, onClick }) => {
    return (
        <Btn
            role="button"
            className={canClick ? "active" : ""}
            onClick={onClick}
        >
            {loading ? "Loading..." : actionText}
        </Btn>
    );
};
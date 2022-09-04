import styled from "styled-components";

interface IMemoButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    text?: string;
    src: any;
    backgroundSize?: string;
}

interface IImgProps {
    src: any;
    backgroundSize?: string;
}

const CMemoButton = styled.button<IImgProps>`
    width: 30px;
    height: 30px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 3px;
    vertical-align: middle;
    background-image: url(${props=>props.src});
    background-size: ${props=>props.backgroundSize ? props=>props.backgroundSize : "18px"};
    background-position: center;
    background-repeat: no-repeat;
`;


export const MemoButton:React.FC<IMemoButtonProps> = ({onClick, text, src, backgroundSize}) => {
    return (
        <CMemoButton onClick={onClick} src={src} backgroundSize={backgroundSize}>
            {text}
        </CMemoButton>
    );
}
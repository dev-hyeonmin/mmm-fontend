import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// @ts-ignore
import backImg from "../images/back.png";


const Back = styled.button`
    width: 20px !important;
    height: 40px;
    background-image: url(${backImg});
    background-color: transparent;
    background-position: center;
    background-size: 20px;
    background-repeat: no-repeat;
`;

export const GoBack: React.FC = () => {
    const navigation = useNavigate();
    const goBack = () => {
        navigation(-1);
    };

    return (
        <Back onClick={goBack}/>
    );
};
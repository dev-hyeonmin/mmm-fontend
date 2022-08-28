import React from "react";
import styled from 'styled-components';

interface IFormErrorProps {
    errorMessage: string | undefined;
}

const Error = styled.span`
    color: ${props => props.theme.colors.error};
    font-weight: 300;
    font-size: 12px;
`;

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => {    
    return (
        <Error>{errorMessage}</Error>
    );
}
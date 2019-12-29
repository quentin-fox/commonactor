import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';


const Loading = () => {

    const LoadingContainer = styled.div`
        text-align: center;
        margin-top: 20px;
    `

    const LoadingText = styled.p`
        font-size: 24px;
    `


    return (
        <LoadingContainer>
            <Spinner animation="border" variant="primary" />
            <LoadingText>Loading...</LoadingText>

        </LoadingContainer>
    )
}


export default Loading;

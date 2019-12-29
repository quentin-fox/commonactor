import React from 'react';
import styled from 'styled-components';
import Actor from './actor';

const ActorList = (props) => {

    const ActorContainer = styled.div`
        margin-top: 30px;
        display: grid;
        grid-gap: 30px;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    `

    return (
        <ActorContainer>
            {props.common.map(actor => {
                return <Actor
                    key={actor.id}
                    actor={actor}
                    searchedShows={props.searchedShows} />
            })}
        </ActorContainer>
    )
}

export default ActorList;

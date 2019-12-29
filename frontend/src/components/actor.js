import React from 'react';
import styled from 'styled-components';

const Actor = (props) => {

    const ActorContainer = styled.div`
        height: 170px;
        border-radius: 10px;
        border: 3px  #007bff  solid;
        padding: 10px 10px 10px 20px;
    `

    const ActorImage = styled.img`
        height: 145px;
        width: 125px;
        object-fit: cover;
        border-radius: 10px;
        float: right;
    `

    const ShowName = styled.p`
        font-size: 14px;
        font-style: italic;
        margin-bottom: 0px;
    `

    const CharName = styled.p`
        font-size: 18px;
        margin-bottom: 5px;

    `

    const ActorName = styled.h4`
        margin-bottom: 15px;

    `

    const imagePath = props.actor.profile_path ? 'https://image.tmdb.org/t/p/w500' + props.actor.profile_path : '';


    return (
        <ActorContainer>
            <ActorImage src={imagePath} />
            <ActorName>{props.actor.name}</ActorName>
            <ShowName>{props.searchedShows[0]}</ShowName>
            <CharName>{props.actor.character_one ? props.actor.character_one : 'Uncredited'}</CharName>
            <ShowName>{props.searchedShows[1]}</ShowName>
            <CharName>{props.actor.character_two ? props.actor.character_two : 'Uncredited'}</CharName>
        </ActorContainer>

    )
}


export default Actor;

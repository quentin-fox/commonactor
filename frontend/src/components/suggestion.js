import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Suggestion = (props) => {

    const [hover, setHover] = useState(false);

    const SuggestionContainer = styled.div`
        height: 50px;
        margin-bottom: 5px;
        background: ${hover ? 'lightgrey' : 'white'};
        border-radius: 5px;
        margin-right: 0px;
        overflow: auto;
    `

    const ShowImage = styled.img`
        float: left;
        height: 50px;
        width: 50px;
        object-fit: cover;
        border-radius: 5px;
    `

    const ShowName = styled.span`
        margin-left: 5px;
        line-height: 50px;
        font-weight: 16px;
    `

    const showYear = () => {
        if (props.show.first_air_date) {
            const year = props.show.first_air_date.slice(0, 4);
            return ` (${year})`;
        }
    }

    const posterPath = () => {

        const baseImgPath = 'https://image.tmdb.org/t/p/w500'

        if (props.show.poster_path) {
            return baseImgPath + props.show.poster_path;
        } else if (props.show.backdrop_path) {
            return baseImgPath + props.show.poster_path
        } else {
            return 'https://www.iconsdb.com/icons/preview/gray/question-mark-6-xxl.png'
        }
    }


    return (
        <SuggestionContainer
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)} 
            onClick={() => props.onSetShow(props.show)}>
            <ShowImage src={posterPath()} alt={""} />
            <ShowName>{props.show.name}{showYear()}</ShowName>
        </SuggestionContainer>
    )

}

export default Suggestion;

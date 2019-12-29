import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Suggestion from './suggestion';

const Search = (props) => {

    const [query, setQuery] = useState('');

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (query.length > 4 && query !== props.show.name) {
            const query_url = 'http://localhost:8000/search?limit=15&q=' + encodeURI(query);
            fetch(query_url)
                .then(response => response.json())
                .then(data => setSuggestions(data))
        } else if (query === '') {
            setSuggestions([]);
        }
    }, [query])

    useEffect(() => {
        setSuggestions([])
        if (props.show.name) {
            setQuery(props.show.name)
        } else {
            setQuery('')
        }
    }, [props.show])


    const handleQuery = (event) => {
        setQuery(event.target.value)
    }

    const SuggestionModal = styled.div`
        margin-top: 10px;
        position: absolute;
        width: 95%;
        border: ${suggestions.length > 0 ? '2px' : '0px'} lightgrey solid;
        border-radius: 7px;
        z-index: 99;
        background-color: ${suggestions.length > 0 ? 'white' : 'none'};
    `

    const SuggestionScroll = styled.div`
        max-height: 380px;
        overflow: scroll;
    `


    return (
        <div className="col">
            <input className="form-control" placeholder={"Search for..."} onChange={handleQuery} value={query} />
            <SuggestionModal>
                <SuggestionScroll>
                    {suggestions.map((show, index) => {
                        return <Suggestion
                            key={show.id}
                            onSetShow={props.onSetShow}
                            show={show} />
                    })}
                    </SuggestionScroll>
                </SuggestionModal>
        </div>
    )
}

export default Search;

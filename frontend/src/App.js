import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';

import Search from './components/search';
import Control from './components/control';
import Nav from './components/nav';

function App() {

    const [showOne, setShowOne] = useState({
        name: 'The Peenorian',
        id: null,
    })

    const [showTwo, setShowTwo] = useState({
        name: 'Game of Thrones',
        id: null,
    })
    
    const [common, setCommon] = useState([
        { name: 'pedro pascale', character_one: 'the mandalorian', character_two: 'the mandalorian', profile_path: '/wAkkWX9J4n1MsLGxJxXSPvjWuzY.jpg'},
        { name: 'pedro pascale', character_one: 'the mendasfja', character_two: 'the poonorian', profile_path: '/wAkkWX9J4n1MsLGxJxXSPvjWuzY.jpg'},
    ])

    const handleSetShowOne = (show) => {
        setShowOne({
            name: show.name,
            id: show.id,
        })
    }

    const handleSetShowTwo = (show) => {
        setShowTwo({
            name: show.name,
            id: show.id,
        })
    }

    const handleResetFields = () => {
        const blankShow = { name: null, id: null, }
        setShowOne(blankShow);
        setShowTwo(blankShow);
        setCommon([]);
    }

    const handleFindActors = () => {
        const commonUrl = `http://localhost:8000/common?show1=${showOne.id}&show2=${showTwo.id}`
        fetch(commonUrl)
            .then(response => response.json())
            .then(data => setCommon(data))
    }

    return (
        <React.Fragment>
            <Nav />
            <div className="container">
                <Control 
                    readyForSearch={showOne.id && showTwo.id}
                    onResetFields={handleResetFields}
                    onFindActors={handleFindActors} />
                <div className="row">
                    <Search onSetShow={handleSetShowOne} show={showOne} key={1} />
                    <Search onSetShow={handleSetShowTwo} show={showTwo} key={2} />
                </div>
            </div>
        </React.Fragment>
    )


}

export default App;

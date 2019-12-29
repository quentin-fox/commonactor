import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';

import Search from './components/search';
import Control from './components/control';
import Nav from './components/nav';
import ActorList from './components/actorlist';
import Loading from './components/loading';
import NoCommon from './components/nocommon';

function App() {

    const [showOne, setShowOne] = useState({
        name: null,
        id: null,
    })
    const [showTwo, setShowTwo] = useState({
        name: null,
        id: null,
    })
    const [loading, setLoading] = useState(false);
    const [common, setCommon] = useState([]);
    const [commonExists, setCommonExists] = useState(null);
    const handleSetShowOne = (show) => {
        setShowOne({
            name: show.name,
            id: show.id,
        })
    }
    const [commonUrl, setCommonUrl] = useState('');
    const [searchedShows, setSearchedShows] = useState([]);

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
        setSearchedShows([]);
        setCommon([]);
        setCommonExists(null);
    }

    const handleStartSearch = () => {
        setCommonUrl(`http://localhost:8000/common?show1=${showOne.id}&show2=${showTwo.id}`);
        setSearchedShows([showOne.name, showTwo.name])
        setCommon([]);
        setCommonExists(null);
        setLoading(true);
    }

    useEffect(() => {
        if (commonUrl.includes('localhost:8000')) {
            fetch(commonUrl)
                .then(response => response.json())
                .then(data => {
                    setCommon(data);
                    setCommonExists(data.length > 0);
                    setLoading(false)
                })
        }
    }, [commonUrl])


    return (
        <React.Fragment>
            <Nav />
            <div className="container">
                <Control 
                    readyForSearch={showOne.id && showTwo.id}
                    loading={loading}
                    onResetFields={handleResetFields}
                    onFindActors={handleStartSearch} />
                <div className="row">
                    <Search onSetShow={handleSetShowOne} show={showOne} key={1} />
                    <Search onSetShow={handleSetShowTwo} show={showTwo} key={2} />
                </div>
                {loading && <Loading />}
                {commonExists === false && <NoCommon />}
                {common.length > 0 && <ActorList 
                    common={common}
                    searchedShows={searchedShows} />}
            </div>
        </React.Fragment>
    )

}

export default App;

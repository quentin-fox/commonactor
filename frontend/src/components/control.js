import React, { useState } from 'react';

const Control = (props) => {

    return (
        <form className="form-inline mb-2">
            <button type="button" className="btn btn-primary mr-3" onClick={props.onFindActors}>Find Common Actors</button>
            <button type="button" className="btn btn-primary" onClick={props.onResetFields}>Clear</button>
        </form>
    )
}

export default Control;

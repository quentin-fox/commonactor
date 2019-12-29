import React from 'react';

const NoCommon = () => {

    const containerStyle = {
        textAlign: 'center',
    }

    const textStyle = {
        marginTop: '20px',
        fontSize: '24px',
    }

    return (
        <div style={containerStyle}>
            <p style={textStyle}>No common actors found.</p>
        </div>
    )
}

export default NoCommon;

import React from 'react';


const Nav = () => {

    const titleStyle = {
        color: 'white',
        fontWeight: 'bold',
    }



    return (
        <nav className="navbar navbar-light bg-primary mb-4">
              <a className="navbar-brand mx-auto" style={titleStyle} href="#">Common Actor</a>
        </nav>
    )
}

export default Nav;

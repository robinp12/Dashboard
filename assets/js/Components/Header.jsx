import React, { Component } from 'react';

class Header extends Component{
    render(){
        const {title, other} = this.props
        return (
            <>
                <h4>{title}{other}</h4>
                <hr />
                <br />
            </>
        );
    }
}
export default Header;
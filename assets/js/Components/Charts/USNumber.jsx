import React, { Component } from 'react';

class USNumber extends Component {

    render(){
        return(
            <>
            <div className="col-md col-xs col-sm card">
               <div className="card-header">
                        Unités infectées
                </div>
                <div className="card-body  text-center">
                    <span id="nb">7/9</span><br/>
                    <span>Unité(s) infectées</span>
                </div>
            </div>
            </>
        )
    }
}

export default USNumber
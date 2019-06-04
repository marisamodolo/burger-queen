import React from 'react';
import './Label.css';

function Label (props){
    return (
        <label for={props.id} className="tab_label">
            {props.text}
        </label>
        
    );
}

export default Label;
import React from 'react';
import './Tab.css';
import CadBox from './CadBox'

function TabCad (props){
    return (
        <div>
        <input type="radio" id={props.id} defaultChecked={props.checked} className="rd_tab" name="tabs"/> 
        <label htmlFor={props.id} className="tab_label">
            {props.text}
        </label>
        <div className="tab-content">
                <CadBox 
                valueEmail={props.valueEmail}
                valueSenha={props.valueSenha}
                onChangeEmail={props.onChangeEmail}
                onChangeSenha={props.onChangeSenha}
                onClick={props.onClick}
                textBtn={props.textBtn}></CadBox>
              </div>
        </div>
    );
}

export default TabCad;
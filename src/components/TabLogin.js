import React from 'react';
import './Tab.css';
import LoginBox from './LoginBox'

function TabLogin (props){
    return (
        <div>
        <input type="radio" id={props.id} defaultChecked={props.checked} className="rd_tab" name="tabs"/> 
        <label htmlFor={props.id} className="tab_label">
            {props.text}
        </label>
        <div className="tab-content">
                <LoginBox 
                valueEmail={props.valueEmail}
                valueSenha={props.valueSenha}
                onChangeEmail={props.onChangeEmail}
                onChangeSenha={props.onChangeSenha}
                onClick={props.onClick}
                textBtn={props.textBtn}></LoginBox>
              </div>
        </div>
    );
}

export default TabLogin;
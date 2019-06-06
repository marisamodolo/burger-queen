import React from 'react';
import Tab from '../components/Tab';
import LoginBox from '../components/LoginBox'
import CadBox from '../components/CadBox'
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseAppAuth = firebase.auth();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      senha: "",
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  createUser = () => {
    this.props.createUserWithEmailAndPassword(this.state.email, this.state.senha);
  }

  signIn = () => {
    this.props.signInWithEmailAndPassword(this.state.email, this.state.senha)
      .then(() => {
        alert("uhul");
      });
  }

  render() {
    return (
      <div>
        <nav className="nav_tabs">
			    <ul>
				    <li>
              <Tab id="tab1" text="LOGIN" checked="true"> 
                <LoginBox 
                valueEmail={this.state.email}
                valueSenha={this.state.senha}
                onChangeEmail={(e) => this.handleChange(e, "email")}
                onChangeSenha={(e) => this.handleChange(e, "senha")}
                onClick={this.signIn}
                textBtn={"ENTRAR"}/>
                </Tab>
            </li>
            <li>
              <Tab id="tab2" text="CADASTRO">  
                <CadBox 
                valueEmail={this.state.email}
                valueSenha={this.state.senha}
                onChangeEmail={(e) => this.handleChange(e, "email")}
                onChangeSenha={(e) => this.handleChange(e, "senha")}
                onClick={this.createUser}
                textBtn={"ENTRAR"}/>
              </Tab>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Home);

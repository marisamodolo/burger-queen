import React from 'react';
import Tab from '../components/Tab';
import LoginBox from '../components/LoginBox';
import CadBox from '../components/CadBox';
import '../App.css';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseAppAuth = firebase.auth();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      senha: "",
      name: "",
      area: "hall"
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  createUser = () => {
    this.props.createUserWithEmailAndPassword(this.state.email, this.state.senha)
    .then((result) => {
      firebase.firestore().collection('users').doc(result.user.uid).set({
        'name': this.state.name,
        'area' : this.state.area
      }).then(() => {
      return this.props.history.push("/" + this.state.area)
      })
    });
  }

  signIn = () => {
    this.props.signInWithEmailAndPassword(this.state.email, this.state.senha)
    .then((result) => {
      firebase.firestore().collection('users').doc(result.user.uid).get().then((result) =>{
        return this.props.history.push("/" + result.data().area)
      })

    })
  }

  sendToDb(){

  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
      <div class="div-nav">
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
                valueName={this.props.name}
                valueEmail={this.state.email}
                valueSenha={this.state.senha}
                onChangeName={(e) => this.handleChange(e, "name")}
                onChangeEmail={(e) => this.handleChange(e, "email")}
                onChangeSenha={(e) => this.handleChange(e, "senha")}
                onChangePlace={(e) => this.handleChange(e, "area")}
                onClick={this.createUser}
                textBtn={"ENTRAR"}/>
              </Tab>
            </li>
          </ul>
        </nav>
      </div>
      </header>
      </div>
    )
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Home);

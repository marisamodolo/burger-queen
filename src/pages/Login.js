import React from 'react';
import Tab from '../components/Tab';
import LoginBox from '../components/LoginBox';
import CadBox from '../components/CadBox';
import '../App.css';
import Modal from 'react-modal';
import '../components/Modal.css'
import PasswordModal from '../components/PasswordModal'
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
      area: "hall",
      modalIsOpen: false
    };
  }

  openModal(){
    this.setState({modalIsOpen: true})
  }

  closeModal(){
    this.setState({modalIsOpen: false})
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  createUser = () => {
    if (this.state.name !== "") {
      this.props.createUserWithEmailAndPassword(this.state.email, this.state.senha)
      .then((result) => {
          firebase.firestore().collection('users').doc(result.user.uid).set({
            'name': this.state.name,
            'area' : this.state.area
          })
            return this.props.history.push("/" + this.state.area)   
      })
      .catch(() => {
        alert("Oops. Algo deu errado! :( \nCheque se o e-mail está escrito corretamente e se sua senha possui pelo menos 6 caracteres.")
      });
    }else{
      alert("Não esqueça de informar seu nome!")
    }
  }

  signIn = () => {
    this.props.signInWithEmailAndPassword(this.state.email, this.state.senha)
    .then((result) => {
      firebase.firestore().collection('users').doc(result.user.uid).get().then((result) =>{
        return this.props.history.push("/" + result.data().area)
      })
    }).catch(() => {
      alert("E-mail e/ou senha incorreto(s).");
    });
  }

  recPass = () =>  {
    firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
      alert("E-mail enviado!");
      this.setState({modalIsOpen: false})
    }).catch(() => {
      alert("Oops. Algo deu errado! :( \nCheque se o e-mail está escrito corretamente.");
    });

  }


  render() {
    return (
      <div className="App">
      <header className="App-header">
      <div className="div-nav">
        <nav className="nav_tabs">
			    <ul>
				    <li>
              <Tab classNameContent="tab-content" id="tab1" text="LOGIN" checked="true"> 
                <LoginBox 
                valueEmail={this.state.email}
                valueSenha={this.state.senha}
                onChangeEmail={(e) => this.handleChange(e, "email")}
                onChangeSenha={(e) => this.handleChange(e, "senha")}
                fgtOnClick={(e) => this.openModal(e)}
                onClick={this.signIn}
                textBtn={"ENTRAR"}/>
                </Tab>
            </li>
            <li>
              <Tab classNameContent="tab-content" id="tab2" text="CADASTRO">  
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
      <Modal className="modal-style" isOpen={this.state.modalIsOpen} onRequestClose={()=>this.closeModal()}>
      <PasswordModal onChangeEmail={(e) => this.handleChange(e, "email")} valueEmail={this.state.email} textBtn="ENVIAR" onClick={(e) => this.recPass()} onClickClose={()=>this.closeModal()}/>  
      </Modal>
      </header>
      </div>
    )
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Home);

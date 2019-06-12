import React, {useState} from 'react';
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

function LoginTest (props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [area, setArea] = useState("hall");

  function createUser () {
    if (name !== "") {
      firebaseAppAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase.firestore().collection('users').doc(result.user.uid).set({
          'name': name,
          'area' : area
        })
        return props.history.push("/" + area)   
      })
      .catch(() => {
        alert("Oops. Algo deu errado! :( \nCheque se o e-mail está escrito corretamente e se sua senha possui pelo menos 6 caracteres.")
      });
    }else{
      alert("Não esqueça de informar seu nome!")
    }
  }

  function signIn () {
    firebaseAppAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      firebase.firestore().collection('users').doc(result.user.uid).get().then((result) =>{
        return props.history.push("/" + result.data().area)
      })
    }).catch(() => {
      alert("E-mail e/ou senha incorreto(s).");
    });
  }

  function recPass ()  {
    firebaseAppAuth.sendPasswordResetEmail(email).then(() => {
      alert("E-mail enviado!");
      setModalIsOpen(false)
    }).catch(() => {
      alert("Oops. Algo deu errado! :( \nCheque se o e-mail está escrito corretamente.");
    });

  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="div-nav">
          <nav className="nav_tabs">
  			    <ul>
	  			    <li>
                <Tab classNameContent="tab-content" id="tab1" text="LOGIN" checked="true"> 
                  <LoginBox 
                  valueEmail={email}
                  valueSenha={password}
                  onChangeEmail={event => setEmail(event.target.value)}
                  onChangeSenha={event => setPassword(event.target.value)}
                  fgtOnClick={(e) => setModalIsOpen(true)}
                  onClick={() => signIn()}
                  textBtn={"ENTRAR"}/>
                </Tab>
              </li>
              <li>
                <Tab classNameContent="tab-content" id="tab2" text="CADASTRO">  
                  <CadBox 
                  valueName={name}
                  valueEmail={email}
                  valueSenha={password}
                  onChangeName={event => setName(event.target.value)}
                  onChangeEmail={event => setEmail(event.target.value)}
                  onChangeSenha={event => setPassword(event.target.value)}
                  onChangePlace={event => setArea(event.target.value)}
                  onClick={() => createUser()}
                  textBtn={"ENTRAR"}/>
                </Tab>
              </li>
            </ul>
          </nav>
        </div>
        <Modal className="modal-style" isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(false)}>
          <PasswordModal onChangeEmail={event => setEmail(event.target.value)} valueEmail={email} textBtn="ENVIAR" onClick={() => recPass()} onClickClose={()=>setModalIsOpen(false)}/>  
        </Modal>
      </header>
    </div>
  );
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(LoginTest);
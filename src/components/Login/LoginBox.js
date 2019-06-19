import React, { useState } from 'react';
import Button from '../Button.js'
import Input from '../Input'
import firebase from '../../firebaseConfig';
import './LoginBox.css'

const firebaseAppAuth = firebase.auth();

export default function LoginBox (props){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <section className="gridLog">
      <p className="p-email">E-MAIL</p>
      <div className= "inp-email">
        <Input type="text" value={email}
        onChange={(event) => setEmail(event.target.value)} />
        <i className="fas fa-envelope"></i>
      </div>
      <p className="p-senha">SENHA</p>
      <div className= "inp-senha">
        <Input type="password" value={password}
        onChange={(event) => setPassword(event.target.value)} />
        <i className="fas fa-lock"></i>
      </div>
      <button onClick={props.fgtOnClick} className="btn-forgotpass">ESQUECEU SUA SENHA?</button>
      <Button className="btn" text="ENTRAR" onClick={() => signIn()} />
    </section>
  );
}
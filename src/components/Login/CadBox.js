import React, {useState} from 'react';
import Button from '../Button.js'
import Input from '../Input'
import firebase from '../../firebaseConfig';
import './CadBox.css'

const firebaseAppAuth = firebase.auth();

export default function CadBox (props){

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [area, setArea] = useState("hall");

	function createUser () {
		if (name !== "") {
			firebaseAppAuth.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				firebase.auth().currentUser.updateProfile({
					displayName: name
				  })
				firebase.firestore().collection('users').doc(result.user.uid).set({
					name,
					area
				})
				return props.history.push("/" + area)   
			})
			.catch((error) => {
				console.log(error)
				alert("Oops. Algo deu errado! :( \nCheque se o e-mail está escrito corretamente e se sua senha possui pelo menos 6 caracteres.")
			});
		}else{
			alert("Não esqueça de informar seu nome!")
		}
	}
    
	return (
		<section className="gridCad">
			<p className="cad-p-name">NOME</p>
			<div className= "div-inp-name">
				<Input type="text" value={name}
				onChange={(event) => setName(event.target.value)} />
				<i className="fas fa-user"></i>
			</div>
			<p className="cad-p-email">E-MAIL</p>
			<div className= "div-inp-email">
				<Input type="text" value={email}
				onChange={(event) => setEmail(event.target.value)} />
				<i className="fas fa-envelope"></i>
			</div>
			<p className="cad-p-senha">SENHA</p>
			<div className= "div-inp-senha">
				<Input type="password" value={password}
				onChange={(event) => setPassword(event.target.value)} />
				<i className="fas fa-lock"></i>
			</div>
			<form id="form-place" className= "div-inp-opt">
				<section className="opt-salao">
					<input type="radio" name="option" value="hall" onChange={event => setArea(event.target.value)} id="opt-salao" defaultChecked/> 
					<label htmlFor="opt-salao">SALÃO</label>
				</section>
				<section className="opt-coz">
					<input type="radio" name="option" value="kitchen" onChange={event => setArea(event.target.value)} id="opt-coz"/> 
					<label htmlFor="opt-coz">COZINHA</label>
				</section>
			</form>
			<Button className="btn cad-btn" text="ENTRAR" onClick={() => createUser()} />
		</section>
	);
}
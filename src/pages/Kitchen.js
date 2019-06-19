import React, {useState, useEffect} from 'react';
import './Kitchen.css'
import firebase from '../firebaseConfig';

export default function (props) {
  const [list, setList] = useState([])
  const [currentItem, setCurrentItem] = useState([])
  const [currentSituation, setCurrentSituation] = useState("")
  const [fullRequest, setFullRequest] = useState([])
  const user = firebase.auth().currentUser;

  useEffect(() => {
    if (!user){ 
      return props.history.push('/')
    }
    firebase.firestore().collection("Order")
    .get()
    .then(function(querySnapshot) {
      const listItem = [];
      querySnapshot.forEach(function(doc) {
        listItem.push(doc.data())
      });
      return listItem;
    })
    .then(data => setList(data));
  })

  function attState(order,situation, request){
    setCurrentItem(order) 
    setCurrentSituation(situation)
    setFullRequest(request)
  }

  function stepOfPreparation(atualSituation){
    setCurrentSituation(atualSituation);
    firebase.firestore().collection("Order")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if(doc.data().employee === fullRequest.employee && doc.data().clientName === fullRequest.clientName ){
          firebase.firestore().collection("Order").doc(doc.id).update({
            situation: atualSituation,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
        }
      });
    })
  }

  function showOrderDetails(){
    return <div className="shown-order">
        <article>
        {
          currentItem.map( (item, index) => {
            const { additional, hamburguer, name, amount } = item;
            if(name === "Hambúrguer Simples" || name === "Hambúrguer Duplo"){
              const plus = hamburguer + " - " + additional.map((add) => ( add )).join(" e ");
              return <p className="item-shown-kitchen" key={index}>{amount} - {name} - {plus}</p>
            }else{
              return <p className="item-shown-kitchen" key={index}>{amount} - {name}</p>
            }
          })
        } 
          <p>{currentSituation}</p>
        </article>
        <section className="btns-section-kitchen">
        <button className="btn btn-preparation" onClick={() => stepOfPreparation("Em Preparo")}>Iniciar Preparo</button>
        <button className="btn btn-preparation" onClick={() => stepOfPreparation("Pronto")}>Pedido Pronto</button>
        </section>
      </div>
  }

  function orders(){
    return list.map( (request, index) => {
      const { situation, order} = request;
      return( 
      <div key={index} className="order-list-kitchen" onClick={() => attState(order, situation, request)}>
        {
          order.slice(0,2).map( (item, index) => {
          return <p key={index}>{item.amount} - {item.name}</p>
          })
        } 
      </div>
    )
  })
  }

  return(
    <div className="App">
      <header className="kitchen-header">
      <i className="fas fa-sign-out-alt btn-sign-out" 
      onClick={() => firebase.auth().signOut().then(() => (props.history.push('/')))}>
      </i>
        <section className="main_kitchen">
          <section className="order-from-firebase">
          { orders() }
          </section>
          <section className="display-full-order">
            {showOrderDetails()}
          </section>
        </section>
      </header>
    </div>
  )
}
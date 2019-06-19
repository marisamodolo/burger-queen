import React, {useState, useEffect} from 'react';
import Tab from '../components/Tab';
import Button from '../components/Button';
import OrderList from '../components/OrderList';
import ListItem from '../components/ListItem';
import './Kitchen.css'
import firebase from '../firebaseConfig';

export default function (props) {
  const [list, setList] = useState([])

  useEffect(() => {
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
  }, [])

  function teste(){
    list.map((item) => {
     item.order.map((order) => {
        console.log( order.name)
      })
    })
  }

  return(
    <div className="App">
    { list.map( x => (
      <span>{ x.clientName }</span>
    )) }
      <header className="kitchen-header">
        <section className="main_kitchen">
          <section className="order-from-firebase">
            <button onClick={() => teste()}>Oi</button>
          </section>
        </section>
      </header>
    </div>
  )
}
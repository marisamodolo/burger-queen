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
    firebase.firestore().collection("Order").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
         list.push(doc.data());
      });
    });
    console.log(teste())
  }, [])

  function teste(){
    return list.map((item) => {
       return item.order.map((order) => {
        return order.name
      })
    })
  }


  return(
    <div className="App">
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
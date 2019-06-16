import React, {useState, useEffect} from 'react';
import Tab from '../components/Tab';
import Button from '../components/Button';
import OrderList from '../components/OrderList';
import ListItem from '../components/ListItem';
import Modal from 'react-modal';
import ObsModal from '../components/ObsModal'
import './Hall.css'
import firebase from '../firebaseConfig';

export default function () {
  const [productMorning, setProductMorning] = useState([])
  const [productDayTime, setProductDayTime] = useState([])
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    firebase.firestore().collection('Menu').doc('menu-list').get().then((result) =>{
      setProductMorning(result.data().productMorning)
      setProductDayTime(result.data().productDayTime)
    })
  }, [])

  useEffect(() => {
    OrderItem();
    setTotal(order.reduce((acc, cur) => { 
    return acc + (cur.amount * cur.price)
    }, 0));
  }, [order])

  function renewMinorState(curArray){
    let newArray = [];
    for(let i of curArray) {
      newArray.push(i);
    }
    return newArray
  }

  function findItem(item){
    return order.findIndex(product =>
      {
        return product.name === item.name;
      });
  }

  function btnProducts(btnsArray){
    return btnsArray.map((product, index) => {
      let callFunction = addItem;
      if(btnsArray === productDayTime){
        if(index === 0 || index === 1){
          callFunction = obsModal;
        }
      }
      const classPosition = "btn listItem btn" + index;
      const valBtn = product.name +"  R$"+ product.price.toFixed(2).replace(".",",");
      return <Button 
      className={classPosition} 
      id={index}
      onClick={() => callFunction(product)} 
      key={index} 
      text={valBtn} />
    })
  }

  function obsModal(){
    setModalIsOpen(true)
  }

  function OrderItem () {
    return order.map((product, index) => {
      return <ListItem 
      key = {index} 
      name={product.name} 
      price={product.price.toFixed(2).replace(".",",")} 
      amount={product.amount} 
      obs="carne bovina"
      onClick={() => deleteItem(product)}
      />
    })
  }

  function addItem(item) {
    if (findItem(item) < 0){
      const newItem = {
        ...item,
        amount: 1
      }
      setOrder(() => { return [...order, { ...newItem}] })
    }else{
      order[findItem(item)].amount += 1;
      setOrder(renewMinorState(order))
    }
  }

  function deleteItem(item){
    const itemIndex = findItem(item);
    order[itemIndex].amount -= 1;
    if(order[itemIndex].amount > 0) {
      setOrder(renewMinorState(order))
    }else{
      order.splice(itemIndex, 1);
      setOrder(renewMinorState(order))
    }
  }

  return(
    <div className="App">
      <header className="App-header">
        <nav className="nav_tabs order-tabs">
          <ul>
            <li>
              <Tab classNameContent="tab-content order-content" id="tab1" text="MANHÃ" checked="true"> 
                <div className="content div-morn">
                  <p className="title-order-one">BEBIDAS</p>
                  <p className="title-order-three">LANCHES</p>
                    { btnProducts(productMorning) }
                  <section className="client-name">
                    <p>CLIENTE</p>
                    <input type="text"/>
                  </section>
                  <OrderList value={total.toFixed(2).replace(".",",")}>
                    { OrderItem() }
                  </OrderList>
                  <Button className="btn listItem btn-send-kitchen" text="ENVIAR A COZINHA" />
                </div>
              </Tab>
            </li>
            <li>
              <Tab classNameContent="tab-content order-content" id="tab2" text="TARDE"> 
              <div className="content"> 
                <p className="title-order-one">HAMBÚRGUERES</p>
                <p className="title-order-two">ACOMPANHAMENTOS</p>
                <p className="title-order-three">BEBIDAS</p>
                { btnProducts(productDayTime) }
                <section className="client-name">
                    <p>CLIENTE</p>
                    <input type="text"/>
                </section>
                <OrderList value={total.toFixed(2).replace(".",",")}>
                  { OrderItem() }
                </OrderList>
                <Button className="btn listItem btn-send-kitchen" text="ENVIAR A COZINHA" />
              </div>
              </Tab>
            </li>
          </ul>
        </nav>
        <Modal className="modal-style" isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(false)}>
          <ObsModal onClickClose={()=>setModalIsOpen(false)}/>  
        </Modal>
      </header>
    </div>
  )
}
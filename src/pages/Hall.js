import React, {useState, useEffect} from 'react';
import Tab from '../components/Tab';
import Button from '../components/Button';
import OrderList from '../components/OrderList';
import ListItem from '../components/ListItem';
import Modal from 'react-modal';
import ObsModal from '../components/ObsModal'
import './Hall.css'
import firebase from '../firebaseConfig';

export default function (props) {
  const [productMorning, setProductMorning] = useState([])
  const [productDayTime, setProductDayTime] = useState([])
  const [clientName, setClientName] = useState("");
  const [order, setOrder] = useState([]);
  const [obs, setObs] = useState({hamburguer: "carne bovina", eggs: false,  cheese: false});
  const [total, setTotal] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [actualProduct, setActualProduct] = useState({});
  const user = firebase.auth().currentUser;

  useEffect(() => {
    if (!user){ 
      props.history.push('/')
    }
    firebase.firestore().collection('Menu').doc('menu-list').get().then((result) => {
      setProductMorning(result.data().productMorning)
      setProductDayTime(result.data().productDayTime)
    })
  }, [user])

  useEffect(() => {
    setTotal(order.reduce((acc, cur) => { 
    return acc + (cur.amount * cur.price)
    }, 0));
  }, [order])


  function SendOrderToFirebase(){
    if(clientName === "") {
      alert("Informe o nome do cliente.")
    }else{
    firebase.firestore().collection('Order').doc().set({
      employee: user.displayName,
      clientName,
      order
    })
    .then(() => {
      alert("Pedido Enviado a Cozinha :)")
      setClientName("")
      setOrder([])
    })
    .catch(() => {
      alert("Oops. Não foi possível enviar seu pedido.")
    })
    }

  }

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
      onClick={(event) => callFunction(product, event)} 
      key={index} 
      text={valBtn} />
    })
  }

  function obsModal(item, event){
    setModalIsOpen(true)
    setActualProduct(event.target.id)
  }

  function attItem(item){
    const product = productDayTime[item];
    const { hamburguer } = obs;
    const additional = []; 
    Object.keys(obs).forEach(function(key) {
      if (obs[key] === true) {
        additional.push(key)
      }
    });
    const newItem = {
      ...product,
        hamburguer,
        additional
    }
    addItem(newItem)
    setObs({hamburguer: "carne bovina", eggs: false,  cheese: false})
    setModalIsOpen(false)
  }

  function addItem(item) {
    let additionalPrice;
    item.additional === undefined ? additionalPrice = 0 : additionalPrice = item.additional.length;
    if (findItem(item) < 0 || item.name === "Hambúrguer Simples" || item.name === "Hambúrguer Duplo"){
      item.price += additionalPrice;
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

  function OrderItem () {
    return order.map((product, index) => {
      const { additional, hamburguer, name, price, amount } = product;
      let plus = "";
      let itemClass = "none";
      let classDiv = "div-product";
      if(product.name === "Hambúrguer Simples" || product.name === "Hambúrguer Duplo")
      {
        plus = hamburguer + " - " + additional.map((add) => { return add })
        itemClass = "product-obs";
        classDiv = "div-product-hamb";
      }     

      return <ListItem 
      classNameDiv = {classDiv}
      key = {index} 
      name={name} 
      price={price.toFixed(2).replace(".",",")} 
      amount={amount} 
      obs={plus}
      className = {itemClass}
      onClick={() => deleteItem(product)}
      />
    })
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
                    <input value={clientName} onChange={(event) => setClientName(event.target.value)} type="text"/>
                  </section>
                  <OrderList value={total.toFixed(2).replace(".",",")}>
                    { OrderItem() }
                  </OrderList>
                  <Button className="btn listItem btn-send-kitchen" onClick={() => SendOrderToFirebase()}text="ENVIAR A COZINHA" />
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
                    <input value={clientName} onChange={(event) => setClientName(event.target.value)} type="text"/>
                </section>
                <OrderList value={total.toFixed(2).replace(".",",")}>
                  { OrderItem() }
                </OrderList>
                <Button className="btn listItem btn-send-kitchen" onClick={() => SendOrderToFirebase()} text="ENVIAR A COZINHA" />
              </div>
              </Tab>
            </li>
          </ul>
        </nav>
        <Modal className="modal-style" isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(false)}>
          <ObsModal 
          onClick={() => attItem(actualProduct)} 
          onChangeEggs={(event)=> setObs({...obs, eggs: event.target.checked})} 
          onChangeCheese={(event)=> setObs({...obs, cheese: event.target.checked})} 
          onChangeHamb={event => setObs({...obs, hamburguer: event.target.value})}
          onClickClose={()=>setModalIsOpen(false)} /> 
        </Modal>
      </header>
    </div>
  )
}
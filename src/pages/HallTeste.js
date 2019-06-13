import React, {useState, useEffect} from 'react';
import Tab from '../components/Tab';
import Button from '../components/Button';
import OrderList from '../components/OrderList';
import ListItem from '../components/ListItem';
import './Hall.css'
import firebase from '../firebaseConfig';

function HallTeste () {
  const [productMorning, setProductMorning] = useState([])
  const [productDayTime, setProductDayTime] = useState([])
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    firebase.firestore().collection('Menu').doc('menu-list').get().then((result) =>{
      setProductMorning(result.data().productMorning)
      setProductDayTime(result.data().productDayTime)
    })
  }, [])

  useEffect(() => {
    setTotal(order.reduce((acc, cur) => { 
      return acc + (cur.amount * cur.price)
    }, 0))
  }, [order])

  function selectItem(item) {
    const itemIndex = order.findIndex(product => {
      return product.name === item.name;
    });
    if (itemIndex < 0){
      const newItem = {
        ...item,
        amount: 1
      }
      setOrder(() => { return [...order, { ...newItem}] })
    }else{
      order[itemIndex].amount += 1;
      let addItem = [];
      for(let i of order) {
        addItem.push(i);
      }
      setOrder(addItem)
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
                    {
                      productMorning.map((product, index) => {
                        const classPosition = "btn listItem btn" + index;
                        const valBtn = product.name +"  R$"+ product.price.toFixed(2).replace(".",",");
                        return <Button 
                        className={classPosition} 
                        id={index}
                        onClick={() => selectItem(product)} 
                        key={index} 
                        text={valBtn} />
                      })
                    }
                  <section className="client-name">
                    <p>CLIENTE</p>
                    <input type="text"/>
                  </section>
                  <OrderList value={total.toFixed(2).replace(".",",")}>
                    {
                      order.map((product, index) => {
                        return <ListItem 
                        key = {index} 
                        name={product.name} 
                        price={product.price.toFixed(2).replace(".",",")} 
                        amount={product.amount} 
                        //onClick={() => this.deleteItem(product)}
                        />
                      })
                    }
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
              {
                productDayTime.map((product, index) => {
                  const classPosition = "btn listItem btn" + index;
                  const valBtn = product.name +"  R$"+ product.price.toFixed(2).replace(".",",");
                  return <Button 
                  className={classPosition}
                  //onClick={() => this.selectItem(product)} 
                  key={index} 
                  text={valBtn}/>
                })
              }
                <OrderList value={total.toFixed(2).replace(".",",")}>
                  {
                    /*order.map((product, index) => {
                      return <ListItem key = {index} 
                      name={product.name} 
                      price={product.price.toFixed(2).replace(".",",")} 
                      amount={product.amount} 
                     // onClick={() => this.deleteItem(product)}
                     />
                    })*/
                  }
                </OrderList>
              </div>
              </Tab>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default HallTeste;
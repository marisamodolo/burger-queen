import React from 'react';
import Tab from '../components/Tab';
import Button from '../components/Button'
import './Hall.css'
import firebase from '../firebaseConfig';

const productMorning = [
  {
    name: "Café Americano",
    price: 5
  },  {
    name: "Café com Leite",
    price: 7
  },  {
    name: "Suco de Fruta Natural",
    price: 7
  },  {
    name: "Sanduíche de Presunto e Queijo",
    price: 10
  }
]

const productDayTime = [
  {
    name: "Hambúrguer Simples",
    price: 10
  },{
    name: "Hambúrguer Duplo",
    price: 15
  },{
    name: "Batata Frita",
    price: 5
  },{
    name: "Anéis de Cebola",
    price: 5
  },{
    name: "Água 500ml",
    price: 5
  },{
    name: "Água 750ml",
    price: 7
  },{
    name: "Bebida Gaseificada 500ml",
    price: 7
  },{
    name: "Bebida Gaseificada 750ml",
    price: 10
  },
]

  class Hall extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        order: [],
        total: 0
      }
    }

  selectItem = (item) => {
    const itemIndex = this.state.order.findIndex((product) =>
    {
      return product.name === item.name;
    });
    if (itemIndex < 0){
      const newItem = {
        ...item,
        amount: 1
      }
      this.setState({
        order: this.state.order.concat(newItem)
      }) 
    } else {
      let addItem = this.state.order;
      addItem[itemIndex].amount += 1;
      this.setState({
        order: addItem
      });
    }
  }

  deleteItem = (item) => {
    const itemIndex = this.state.order.findIndex((product) =>
    {
      return product.name === item.name;
    });
    let removeItem = this.state.order;
    removeItem[itemIndex].amount -= 1;
    const amount = removeItem[itemIndex].amount;
    if(amount > 0) {
      this.setState({
        order: removeItem
      })
    }else{
      removeItem.splice(itemIndex, 1);
      this.setState({
        order: removeItem
      })
    }
  }
  
  render() {
    const total = this.state.order.reduce((acc, cur) => { 
      return acc + (cur.amount * cur.price)
    }, 0)

    return (
      <div className="App">
        <header className="App-header">
          <nav className="nav_tabs order-tabs">
			    <ul>
				    <li>
              <Tab classNameContent="tab-content order-content" id="tab1" text="MANHÃ" checked="true"> 
              <div className="content div-morn">
              <p className="title-hamb">BEBIDAS</p>
              <p className="title-drinks">LANCHES</p>
                {
                  productMorning.map((product, index) => {
                    const classPosition = "btn listItem btn" + index;
                    const valBtn = product.name +"  R$"+ product.price;
                    return <Button 
                    className={classPosition} 
                    id={index}
                    onClick={() => this.selectItem(product)} 
                    key={index} 
                    text={valBtn} />
                  })
                }
                <div class="order-list">
                  {
                    this.state.order.map((product, index) => {
                      return <div key = {index}> 
                        <p>{product.name} - {product.price}
                      - {product.amount} </p>
                      <button onClick={() => this.deleteItem(product)}>Excluir</button>
                      </div>
                    })
                  }
                  <h1>Total</h1>
                  <p>Valor total: {total}</p>
                </div>
              </div>
              </Tab>
            </li>
            <li>
              <Tab classNameContent="tab-content order-content" id="tab2" text="TARDE"> 
              <div className="content"> 
              <p className="title-hamb">HAMBÚRGUERES</p>
              <p className="title-acomp">ACOMPANHAMENTOS</p>
              <p className="title-drinks">BEBIDAS</p>
              {
                productDayTime.map((product, index) => {
                  const classPosition = "btn listItem btn" + index;
                  const valBtn = product.name +"  R$"+ product.price;
                  return <Button 
                  className={classPosition}
                  onClick={() => this.selectItem(product)} 
                  key={index} 
                  text={valBtn}/>
                  
                })
              }
              <div class="order-list">
                {
                  this.state.order.map((product, index) => {
                    return <div key = {index}> 
                      <p>{product.name} - {product.price}
                    - {product.amount} </p>
                    <button onClick={() => this.deleteItem(product)}>Excluir</button>
                    </div>
                  })
                }
                <h1>Total</h1>
                <p>Valor total: {total}</p>
              </div>
              </div>
              </Tab>
            </li>
          </ul>
          </nav>
        </header>
      </div>
    )
  }
}

export default Hall;

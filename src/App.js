
import Product from './components/products/Product.js';
import CartItem from './components/cart/Cart.js';
import toastMixin from './components/toast.js';
import Navbar from './components/navbar/Navbar'

import { getProducts, getProduct } from'./data.js';
import './app.css'

import { useState } from 'react';



const buttons = ['+', 'delete', '-'];

const App = () => {

  const allProducts = getProducts();

  let itemsList = [];
  let [cart, setCart] = useState([itemsList]);
  let [total, setTotal] = useState(0);


  const addToCartHandler = (evt) => {
  
    evt.preventDefault();
    let id = evt.target.value
    let product = getProduct(Number(id));
    
    //console.log('PROD', product);
    let isReapeat = 
      cart.find(el => el.id === product.id) 
      ? true
      : false;


    if (!isReapeat) {
      setCart((prevItems) => [
        ...prevItems, 
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          description: product.description,
          image: product.image
        }
      ])
      setTotal(() => total + product.price)
      toastMixin.fire({
        title: `${product.name} added!`,
        icon: 'success'
      })
      
    } else {
      
      toastMixin.fire({
        title: `${product.name} already added, can change the quantity on the cart!`,
        icon: 'error'
      })
      
    }
  };


  const addQuantityHandler = (ev, id) => {

    console.log('adding ...')
    ev.preventDefault();
    try {
        cart.map(
          object => {
            if (object.id === id) {
              setTotal(total + (object.price * 1))
              return { 
                ...object, 
                quantity: object.quantity += 1 
              } 
            }
            return object
          }
        )
        
        setCart((prevItems) => [
          ...prevItems
        ]);



    } catch {
      toastMixin.fire({
        title: 'something went bad',
        icon: 'error'
      })
    }
    
    
  };


  const substractQuantityHandler = (ev, id) => {
    console.log('substracting ...')
    ev.preventDefault();
    try {
      cart.map(
        object => {
          if (object.id === id && object.quantity !== 1) {
            
            setTotal(total - (object.price * 1))
            return { 
              ...object, 
              quantity: object.quantity -= 1
            }

          
          } else if (object.quantity === 1) {
            toastMixin.fire({
              title: 'Please use delete instead!',
              icon: 'info'
            })
          }
          return object
        }
      );
      
      setCart((prevItems) => [
        ...prevItems
      ]);


    } catch {
      toastMixin.fire({
        title: 'something went bad',
        icon: 'error'
      })
    }
  };


  const deleteHandler = (id) => {
    console.log('deleting ...');
    let product = getProduct(id);

    cart.map(
      object => {
        if (object.id === id) {
          setTotal(total - (object.price * object.quantity))
          return {
            ...object,
            quantity: object.quantity = 0,
           
          }
        }
        return object
      }
    );

    setCart((prevItems) => [
      ...prevItems
    ]);

    //return all objects diferent by the selected and where the quantity isnt 0
    setCart(cart.filter(
      object => object.quantity !== 0 && object.id !== id 
    ));

    toastMixin.fire({
      title: `Deleted ${product.name} from cart!`,
      icon: 'warning'
    })
  };


  return (
    <div className="App">


      <Navbar/>

      <div className="box">
        <div className="products-container">

          <table className="table">
            <tbody>
            {
              allProducts.length < 0
              ? 'Is Empty dear'
              : allProducts.map((product, id) => {
                return(
                  <tr key={`${product.name}-${id}`} className="product-item">
                    <Product
                      className= {product.name}
                      item= {product}
                    />

                    <td className="prod-btn-container">
                      <button 
                        type="button"
                        className="prod-btn-add text-white"
                        value= {product.id}
                        onClick= {(e) => addToCartHandler(e)}
                        >
                          Add to cart
                      </button>
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>

        </div>
      </div>


      <div className='box'>

        <div className="cart-container">
          { 
            total === 0 
              ? ''
              : 
              <div className='container'>
                  <div className='row'>
                      <div className='col-6'>
                        <b>Cart</b>
                      </div>
                      <div className='col-6'>
                        <b>${total}</b>
                      </div>
                  </div>
                  <>
                    { 
                      cart.length === 1 
                      ? 'cart empty :C'
                      :                   
                        cart.flat().map((product, id) => {
                          return(
                            <div className="row cart-item" key={`${product}-${id}`}>
                            
                              <CartItem item={product}/>
                              <div className="button-container" key={`btns-${product.name}`}>
                                {
                                  buttons.map((button, id) => {
                                    return(
                                        <button
                                          className= {
                                            button === '+'
                                              ? 'btn-addq text-white'
                                              : button === '-'
                                              ? 'btn-subsq text-white'
                                              : "btn-del text-white"
                                          }
                                          key= {`btn-${id}`}
                                          value= {button}
                                          onClick= {
                                            (evt) => {
                                              button === '+'
                                                ? addQuantityHandler(evt, product.id)
                                                : button === '-'
                                                ? substractQuantityHandler(evt, product.id)
                                                : button === 'delete'
                                                ? deleteHandler(product.id)
                                                : toastMixin.fire({
                                                title: `${button}, no valid!`,
                                                icon: 'error'
                                              })
                                            }
                                          }
                                          > {button}
                                        </button>
                                  
                                    )
                                  })
                                }
                              </div>
                     
                            </div>
                          )
                        })
                    }
                  </>
              </div>                    
          }                
        </div>    
      </div>            

    </div>
  )      

};

export default App;
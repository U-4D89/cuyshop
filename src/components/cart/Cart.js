const CartItem = ( { item } ) => {
    return(
            <div className="cart-i-head container">

                <div className="d-flex justify-content-center">
                 
                    <img 
                        src= {item.image} 
                        alt= {item.name} 
                        style={{height: 50 + '%', width: 50 + '%'}}
                    />
                   
                </div>

                <div className="cart-item-info row">
                    
                    <p> <b>{item.name}</b> </p>
                    <p className="h6"> price per unit: ${item.price} </p>
                    <p> items in your cart:  {item.quantity} </p>   
                 
                </div>
              
            </div>
    )
};

export default CartItem;
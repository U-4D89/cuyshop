// img-fluid rounded float-start

const Product = ( {item} ) => {
    return (
        <>
            <td className="prod-img-container">
                <img 
                    src= {item.image}
                    alt= {item.name}
                    className= "prod-img"
                    style={{height: 50 + '%', width: 50 + '%'}}
                />
            </td>

            <td>
                <p className="h5"> <b>{item.name}</b></p>
                <p className="h6"> $ {item.price} </p>
                <p className="small"><em>{item.description}</em></p>
            </td>

        </>
    )
};

export default Product;
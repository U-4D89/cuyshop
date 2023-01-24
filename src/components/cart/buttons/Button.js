const Button = ({ onClick, value, itemID }) => {
    return(
        <button
            onClick= {onClick}
            value= {itemID}
        > {value}
        </button>
    )
};

export default Button;
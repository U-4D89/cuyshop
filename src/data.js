const products = [
    {
        id: 1,
        name: 'Hay container',
        stock: 10,
        price: 15.00,
        image: 'https://i.ibb.co/G0Jy1md/haybag.png',
        description: 'Perfect for keep clean the hay, no waste assured.'
    },
    {
        id: 2,
        name: 'mushroom house',
        stock: 10,
        price: 20.00,
        image: 'https://i.ibb.co/Vpb5JZ6/house.png',
        description: 'Better than an ordinary house.'
    },
    {
        id: 3,
        name: 'plate',
        stock: 10,
        price: 5.00,
        image: 'https://i.ibb.co/bHNbcKN/plate.png',
        description: 'Just a fancy plate for delicious veggies.'
    },
    {
        id: 4,
        name: 'watter bottle',
        stock: 10,
        price: 7.00,
        image: 'https://i.ibb.co/Wn2vQbc/watercont.png',
        description: 'Always ready for you thirsty buddy. Also the water is not included, please change it diary.'
    }
];


export function getProducts() {
    return products
}

export function getProduct(id) {
    return products.find(
        (product) => product.id === id
    )
}
const product = document.querySelector('#productsForm');
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const img = document.querySelector('#img');
const tableBody = document.querySelector('#tableBody');
const chat = document.querySelector('#messagesForm');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const messageBox = document.querySelector('#messageContainer');

const socket = io();

product.addEventListener('submit', (e) =>{
    e.preventDefault()

    let newProduct = {
        title: title.value,
        price: price.value,
        img: img.value
    }

    socket.emit('addProduct', newProduct)

        title.value = " "
        price.value = " "
        img.value = " "
});

const addProductToTable = (data) =>{
    const trInput = document.createElement('tr');
    const id = document.createElement('td');
    const title = document.createElement('td');
    const price = document.createElement('td');
    const imgURL = document.createElement('td');
    const tdImage = document.createElement('td');
    const image = document.createElement('img');

    
    id.innerText = data.id;
    title.innerText = data.title;
    price.innerText = data.price;
    image.setAttribute('src', data.imgURL);
    image.setAttribute('alt', 'Imagen no disponible'); 
    
    trInput.appendChild(id);
    trInput.appendChild(title);
    trInput.appendChild(price);
    trInput.appendChild(tdImage);
    tdImage.appendChild(image);


    tableBody.appendChild(trInput);
}

socket.on('addTable',(data) =>{
    addProductToTable(data);
})

chat.addEventListener('submit', (e) =>{
    e.preventDefault()

    let newMessage = {
        email: email.value,
        msg: message.value
    }

    socket.emit('newMessage', newMessage)

    email.value= ''
    message.value = ''
})

const addNewMessage = (data) =>{
    const messageContainer = document.createElement('div');
    const messageEmail = document.createElement('p');
    const messageTime = document.createElement('span');
    const messageText = document.createElement('p');

    messageEmail.innerText = data.email;
    messageText.innerText = data.msg;
    messageTime.innerText = data.time;

    messageContainer.appendChild(messageEmail);
    messageEmail.appendChild(messageTime);
    messageContainer.appendChild(messageText);

    messageBox.appendChild(messageContainer);
}

socket.on('renderMessage', (data) =>{
    addNewMessage(data);
})
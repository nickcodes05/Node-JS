const socket = io();

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    
    const message = e.target.elements.message.value
    
    const select_area = document.querySelector('body');
    const mess = document.createElement('paragraph');
    mess.innerHTML = message;
    select_area.appendChild(mess);
    
    socket.emit('sendMessage', message, (error) => {
	if(error) {
		return console.log(error)
	}
	
	console.log('Message Delivered')
	
	//message grabs callback from index.js
	//console.loge('The message was delivered!', message)
})
})

// geolocation will bring in location information
document.querySelector('#send-location').addEventListener('click', () => {
if(!navigator.geolocation) {
	return alert('Geolocation is not support by your browser')
}

navigator.geolocation.getCurrentPosition((position) => {
	socket.emit('sendLocation', {
		latitude: position.coords.latitude,
		longitude: position.coords.longitude
	}, () => {
		console.log('Location shared!')
	})
})
}))
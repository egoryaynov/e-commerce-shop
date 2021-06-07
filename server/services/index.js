const deliveryService = require('./deliveryService/app')

Promise.all([
    deliveryService.start()
]).then(r => {
    console.log('[Services]: All services started')
})
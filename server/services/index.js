const deliveryService = require('./deliveryService/app')

Promise.all([
    deliveryService.start()
]).then(r => {
    console.log('[Server]: All services started')
})
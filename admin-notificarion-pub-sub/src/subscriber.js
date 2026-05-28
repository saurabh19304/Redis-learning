import Redis from 'ioredis';

const subscriber = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

subscriber.subscribe('notification' (err) => {
	if(err){
		console.error('you are not subscribed', err.message);
		return;
	}
	console.log('you are subscribed');
});

subscriber.on('message' (chennel, message) => {
	console.log('recieved on', chennel, ':', JSON.parse(message));
})



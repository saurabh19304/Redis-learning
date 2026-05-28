import express from 'express';
import Redis from 'ioredis';

const app = express();


const publisher = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

app.post('/notification', async (req, res) => {
	const payload = {
		title: req.body.title || 'Default title',
		createdAt: new Date().toISOstring(),
	}

	const recievers = await publish.publish('notification', JSON.stringify(payload));
	res.json({message: `notification sent to ${reciever} subscriber`})
})


app.listen(3000, () => {
	console.log('API is running on port http://lacalhost:3000')
})

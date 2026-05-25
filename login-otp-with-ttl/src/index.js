import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');


function otpKey(phone){
	return `otp:${phone}`;
}

app.post('/otp', async (req, res) => {
	const { phone } = req.body;
	const otp = Math.floor(100000 + Math.random() * 900000).toString();

	await redis.set( otpKey(phone), otp, 'EX', 30) //vlid only for 30 sec;
	res.json({message: 'OTP sent', otp}); //we send this through the sms or email 
});

app.post("/otp/verify", async (req, res) => {
	const { phone , otp } = req.body;

	const savedOtp = await redis.get( otpKey(phone))

	if( !savedOtp){
		res.json({ message: " OTP expires or not found"});
	}
	if( savedOtp !== otp) {
		 return res.json({ message: "Invalid otp"});
	}

	await redis.del(otpKey(phone));
	 res.json({ message: "OTP verified successfully"});


});


app.get("/otp/:phone/ttl", async (req, res ) => {
	const ttl = await redis.ttl(otpKey(req.params.phone));
	res.json( {ttl} );
});

app.listen(3000, () => {
	console.log("server is running on port http://localhost:3000");
});


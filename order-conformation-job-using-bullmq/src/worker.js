import {worker} from 'bullmq';
import {connection} from './queue.js';

const worker = new Worker(
	"emails", //pick from which queue we want to pick data
	async (job) => {

	console.log("processing email job..", job.id, job.name, job.data);
	await new Promise((resolve) => setTimeout(resolve, 1500));
	console.log("Email job completed"job.id, job.name, job.data));
	},
	{connection}
)

//we add some listening events
worker.on("completed", (job) => {
	console.log("job completed"job.id, job.name, job.data));
	
});

worker.on("failed", (job) => {
	console.log("job failed"job.id, job.name, job.data));
	
});

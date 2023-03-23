const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const e = require('express');
const port = process.env.PORT || 5000;
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.mdoqsyi.mongodb.net/?retryWrites=true&w=majority`;
// console.log( uri );
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

async function run() {
	const usersCollection = client.db('HeroRider').collection('users');

	try {
		// post users
		app.post('/users', async (req, res) => {
			const user = req.body;
			const result = await usersCollection.insertOne(user);
			res.send(result);
		});

		app.get('/users', async (req, res) => {
			const user = {};
			const result = await usersCollection.find(user).toArray();
			res.send(result);
		});
	} finally {
	}
}

run().catch((error) => console.log(error));

app.get('/', (req, res) => {
	res.send('Rider server is running...');
});

app.listen(port, () => {
	console.log(`Rider server is running on ${port}`);
});
module.exports = router;

import express from 'express';
import cors from 'cors';
import {JSONFilePreset} from 'lowdb/node';
import path from 'path';
import {fileURLToPath} from 'url';

const app = express();
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
    console.log('Server is definitely listening on http://localhost:3000');
});

app.post('/api/save', async (req, res) => {
    const defaultData = {users: []};
    const db = await JSONFilePreset('db.json', defaultData);
    try {
        let newUser = req.body;
        console.log(newUser);
        await db.update(({ users }) => users.push(newUser))

        res.json({ success: true, user: newUser });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

import express from 'express';
import cors from 'cors';
import { JSONFilePreset } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());
app.listen(3000,() => {
    console.log('Server is definitely listening on http://localhost:3000');
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonFilePath = path.join(__dirname, 'db', 'data.json');
const defaultData = {users: []}
const db = await JSONFilePreset(jsonFilePath, defaultData);

app.post('/api/save', async (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    try {
        await db.update((data) => {
            if (!data.users) {
                data.users = [];
            }
            data.users.push(newUser);
        });
        res.json({ status: "Success", message: "Data saved!" });
    } catch (error) {
        console.error("Save Error:", error);
    }
});

// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

// Configurações iniciais
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Erro ao conectar ao MongoDB: ', err));

// Modelo de Usuário
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  avatar: String,
});

const User = mongoose.model('User', userSchema);

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Rotas
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Credenciais inválidas' });
  }
});

// CRUD de Usuários
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/api/users', upload.single('avatar'), async (req, res) => {
  const { username, password } = req.body;
  const avatar = req.file ? req.file.path : '';
  const newUser = new User({ username, password, avatar });
  await newUser.save();
  res.json(newUser);
});

app.put('/api/users/:id', upload.single('avatar'), async (req, res) => {
  const { username, password } = req.body;
  const avatar = req.file ? req.file.path : req.body.avatar;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, password, avatar }, { new: true });
  res.json(updatedUser);
});

app.delete('/api/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Usuário deletado com sucesso' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
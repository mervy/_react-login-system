// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Form, Button, Table, Card, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Componentes
const Header = () => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

const Footer = () => (
  <footer className="bg-dark text-white text-center p-3 mt-5">
    <p>&copy; 2023 Admin Dashboard</p>
  </footer>
);

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { username, password });
      if (response.data.success) {
        navigate('/dashboard');
      } else {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Usuário</Form.Label>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={handleLogin}>Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/users/${id}`);
    setUsers(users.filter(user => user._id !== id));
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <Button variant="danger" onClick={handleLogout} className="mb-3">Logout</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Avatar</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td><img src={user.avatar} alt={user.username} width="50" /></td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(user._id)}>Deletar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

const InsertTable = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('avatar', avatar);

    const response = await axios.post('/api/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
  };

  return (
    <Container className="mt-5">
      <Form>
        <Form.Group>
          <Form.Label>Usuário</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Avatar</Form.Label>
          <Form.Control type="file" onChange={(e) => setAvatar(e.target.files[0])} />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>Inserir</Button>
      </Form>
    </Container>
  );
};

const UpdateForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('avatar', avatar);

    const response = await axios.put('/api/users/:id', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
  };

  return (
    <Container className="mt-5">
      <Form>
        <Form.Group>
          <Form.Label>Usuário</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Avatar</Form.Label>
          <Form.Control type="file" onChange={(e) => setAvatar(e.target.files[0])} />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>Atualizar</Button>
      </Form>
    </Container>
  );
};

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/insert" element={<InsertTable />} />
      <Route path="/update" element={<UpdateForm />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
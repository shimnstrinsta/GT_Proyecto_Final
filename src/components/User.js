import React, { useState } from 'react';
import { Button, Container, Divider, Header as SemanticHeader, Form, Image } from 'semantic-ui-react';
import { TextField } from '@mui/material';

const User = () => {
    const [username, setUsername] = useState("nombre_de_usuario");
    const [userData, setUserData] = useState({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePhotoUpdate = () => {
      console.log("Actualizar foto de perfil");
    };

    const handleSubmit = () => {
      console.log("Actualizar datos:", userData);
    };

    return (
      <Container className="profile-container">
        <div className="profile-photo">
          <Image
            src="https://via.placeholder.com/150" 
            size="small"
            circular
            alt="Foto de perfil"
          />
        </div>
        <Divider />
        <Form className="profile-form" onSubmit={handleSubmit}>
          <Form.Field>
            <TextField
              label="Nombre"
              name="nombre"
              value={userData.nombre}
              onChange={handleChange}
              fullWidth
            />
          </Form.Field>
          <Form.Field>
            <TextField
              label="Apellido"
              name="apellido"
              value={userData.apellido}
              onChange={handleChange}
              fullWidth
            />
          </Form.Field>
          <Form.Field>
            <TextField
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              fullWidth
            />
          </Form.Field>
          <Form.Field>
            <TextField
              label="Contraseña"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              fullWidth
            />
          </Form.Field>
          <Button type="submit" color="green" fluid>
            Actualizar perfil
          </Button>
        </Form>
      </Container>
    );
  };


  export default User;
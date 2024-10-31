import React, { useState, useEffect } from 'react';
import { Button, Container, Divider, Form, Image } from 'semantic-ui-react';
import { TextField } from '@mui/material';
import { userService } from '../services/UserService';

const User = () => {
  const [userData, setUserData] = useState({
    id_empleado:"",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    photo: ""
  });
  
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log("Actualizar datos:", userData);
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  
  const fetchUserData = async () => {
    setLoading(true);
    try {
      await userService.getEmployee()
      .then(response =>{
        if (response.success) {
          setUserData({
            id_empleado: response.employee.id_empleado,
            nombre: response.employee.nombre,
            apellido: response.employee.apellido,
            email: response.employee.email,
            password: response.employee.contrasenia, // Mantener la contraseña vacía por seguridad
            photo: response.employee.ruta_foto // Asignar correctamente la foto
          });
        }
         else {
          alert("No se pudo obtener tus datos de usuario, por favor intentá más tarde");
        }
      })
      
    } 
    catch (error) {
      alert("No se pudo obtener la información del usuario: " + error.message);
    }
     finally {
      setLoading(false);
    }
  };

  return (
    <Container className="profile-container">
      <div className="profile-photo">
        <Image
          src={userData.photo || "https://via.placeholder.com/150"} // Si no hay foto, mostrar un placeholder
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
        <Button type="submit" color="green" fluid disabled={loading}>
          {loading ? "Actualizando..." : "Actualizar perfil"}
        </Button>
      </Form>
    </Container>
  );
};

export default User;

import React, { useState, useEffect } from 'react';
import { Button, Container, Divider, Form, Image } from 'semantic-ui-react';
import { TextField } from '@mui/material';
import { userService } from '../services/UserService';

const User = () => {
  const [userData, setUserData] = useState({
    id_empleado: "",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    photo: ""
  });

  const [originalData, setOriginalData] = useState(null); // Datos originales para comparar cambios
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [isModified, setIsModified] = useState(false); // Estado para habilitar/deshabilitar el botón
  const [message, setMessage] = useState(""); // Estado para el mensaje dinámico
  const [messageColor, setMessageColor] = useState(""); // Color del mensaje

  useEffect(() => {
    if (originalData) {
      setIsModified(
        JSON.stringify(userData) !== JSON.stringify(originalData)
      );
    }
  }, [userData, originalData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const { id_empleado, nombre, apellido, email, password } = userData;
    
    userService.updateEmployee({
      id_empleado,
      nombre,
      apellido,
      email,
      contrasenia: password
    })
      .then((response) => {
        if (response.success) {
          setMessage("Perfil actualizado exitosamente");
          setMessageColor("#2680f7"); // Color de éxito
          setOriginalData(userData); // Actualiza los datos originales tras una actualización exitosa
        } else {
          setMessage("Error al actualizar el perfil: " + response.message);
          setMessageColor("red"); // Color de error
        }
      })
      .catch((error) => {
        setMessage("Error en la actualización: " + error.message);
        setMessageColor("red"); // Color de error
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      await userService.getEmployee()
        .then(response => {
          if (response.success) {
            const fetchedData = {
              id_empleado: response.employee.id_empleado,
              nombre: response.employee.nombre,
              apellido: response.employee.apellido,
              email: response.employee.email,
              password: response.employee.contrasenia,
              photo: response.employee.ruta_foto 
            };
            setUserData(fetchedData);
            setOriginalData(fetchedData); // Guardar los datos originales para compararlos
          } else {
            setMessage("No se pudo obtener tus datos de usuario, por favor intentá más tarde");
            setMessageColor("red"); // Color de error
          }
        });
    } catch (error) {
      setMessage("No se pudo obtener la información del usuario: " + error.message);
      setMessageColor("red"); // Color de error
    } finally {
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
            required
          />
        </Form.Field>
        <Form.Field>
          <TextField
            label="Apellido"
            name="apellido"
            value={userData.apellido}
            onChange={handleChange}
            fullWidth
            required
          />
        </Form.Field>
        <Form.Field>
          <TextField
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            fullWidth
            required
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
            required
          />
        </Form.Field>
        <Button type="submit" color="green" fluid disabled={!isModified || loading}>
          {loading ? "Actualizando..." : "Actualizar perfil"}
        </Button>
        {message && <p style={{ color: messageColor}}>{message}</p>}
      </Form>
    </Container>
  );
};

export default User;

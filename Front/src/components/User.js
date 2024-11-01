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

  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (originalData) {
      setIsModified(
        JSON.stringify(userData) !== JSON.stringify(originalData)
      );
    }
  }, [userData, originalData]);

  const validateFields = () => {
    const newErrors = {};
    const requiredFields = ['nombre', 'apellido', 'email', 'password'];
    
    requiredFields.forEach(field => {
      if (!userData[field] || userData[field].trim() === '') {
        newErrors[field] = 'Este campo es obligatorio';
      }
    });

    // Validación específica para email
    if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
    
    // Limpiar el error del campo cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Limpiar mensaje general
    if (message) {
      setMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      setMessage("Por favor, completa todos los campos requeridos");
      setMessageColor("red");
      return;
    }

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
          setMessageColor("#2680f7");
          setOriginalData(userData);
          setErrors({});
        } else {
          setMessage("Error al actualizar el perfil: " + response.message);
          setMessageColor("red");
        }
      })
      .catch((error) => {
        setMessage("Error en la actualización: " + error.message);
        setMessageColor("red");
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
            setOriginalData(fetchedData);
          } else {
            setMessage("No se pudo obtener tus datos de usuario, por favor intentá más tarde");
            setMessageColor("red");
          }
        });
    } catch (error) {
      setMessage("No se pudo obtener la información del usuario: " + error.message);
      setMessageColor("red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="profile-container">
      <div className="profile-photo">
        <Image
          src={userData.photo || "https://via.placeholder.com/150"}
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
            error={!!errors.nombre}
            helperText={errors.nombre}
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
            error={!!errors.apellido}
            helperText={errors.apellido}
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
            error={!!errors.email}
            helperText={errors.email}
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
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            required
          />
        </Form.Field>
        <Button 
          type="submit" 
          color="green" 
          fluid 
          disabled={!isModified || loading}
        >
          {loading ? "Actualizando..." : "Actualizar perfil"}
        </Button>
        {message && <p style={{ color: messageColor, marginTop: '1rem' }}>{message}</p>}
      </Form>
    </Container>
  );
};

export default User;
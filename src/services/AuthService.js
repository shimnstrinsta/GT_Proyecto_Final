

export const authService = {
    login: (email, password) => {
      return fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => {
          const user = users.find(u => u.email === email);
          const authPassword = "bautiteamo"; // Contraseña fija para autenticación
          if (user && authPassword === password) {            
            localStorage.setItem("user",email);
            return { success: true, email: user.email, name: user.name };
          } else {            
            return { success: false, message: "Error: Credenciales incorrecta" };
          }
        })
        .catch(error => {          
          return { success: false, message: "Error de autenticación: " + error.message };
        });
    },
  
    register: (email, password) => {
      return fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => {
          // Ejemplo simple de validación: Si el email es "hola@hola.com", no se permite el registro
          if (email === "hola@hola.com") {
            return { success: false, message: "El email ya está ingresado" };
          }
          localStorage.setItem("user",email);
          return { success: true, message: "¡Registro exitoso!" };
        })
        .catch(error => {          
          return { success: false, message: "Error de registro: " + error.message };
        });
    }
  };
  
export const authService = {
    login: (email, password) => {
      return fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => {
          const user = users.find(u => u.email === email);
          const authPassword = "bautiteamo"; // Contraseña fija para autenticación
  
          if (user && authPassword === password) {
            console.log("¡Se logueó correctamente!");
            return { success: true, email: user.email, name: user.name };
          } else {
            console.log("No se pudo loguear :(");
            return { success: false, message: "Error: Credenciales incorrectas boludooooooooooooo" };
          }
        })
        .catch(error => {
          console.error("Ocurrió un error: " + error.message);
          return { success: false, message: "Error de autenticación: " + error.message };
        });
    },
  
    register: (email, password,role) => {
      return fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => {
          // Ejemplo simple de validación: Si el email es "hola@hola.com", no se permite el registro
          if (email === "hola@hola.com") {
            return { success: false, message: "El email ya está registrado boludooooooooooo." };
          }
          else if (role === "supervisor"){
            return {success: false, message: "No podés ser supervisor, bobi!"}
          }

          return { success: true, message: "¡Registro exitoso!" };
        })
        .catch(error => {
          console.error("Ocurrió un error: " + error.message);
          return { success: false, message: "Error de registro: " + error.message };
        });
    }
  };
  
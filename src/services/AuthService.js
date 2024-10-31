

export const authService = {
    login: (email, password) => {
      return fetch(`http://localhost:3001/employee/${email}/${password}`)
        .then(response => response.json())
        .then(user => {          
          if (user && user.email) {            
            localStorage.setItem("user",email);
            localStorage.setItem("id_user",user.id_empleado);
            return { success: true, email: user.email, name: user.name };
          } else {            
            return { success: false, message: "Error: " + user.message };
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
  
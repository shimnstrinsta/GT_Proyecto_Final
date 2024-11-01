export const authService = {
  login: (email, password) => {
    return fetch(`http://localhost:3001/employee/${email}/${password}`)
      .then(response => response.json())
      .then(user => {
        console.log(user)
        if (user && user.email) {
          localStorage.setItem("user", user.email);
          localStorage.setItem("id_user", user.id_empleado);
          return { success: true, email: user.email, name: user.name, supervisor: user.supervisor};
        } else {
          return { success: false, message: "Error: " + user.message };
        }
      })
      .catch(error => {
        return { success: false, message: "Error de autenticación: " + error.message };
      });
  },

  register: (name, lastName, email, password) => {

    const data = {            
      nombre:name,
      apellido:lastName,
      contrasenia:password,
    }    

    return fetch(`http://localhost:3001/employee/${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    })
      .then(response => response.json())
      .then(employee => {            
        if (employee.success) {          
          localStorage.setItem("user", employee.employee.email);
          localStorage.setItem("id_user", employee.employee.id_empleado);
          return { success: true, message: employee.message };
        }
        else {
          return { success: false, message: "Error en el ingreso " + employee.message };
        }
      })
      .catch(error => {
        return { success: false, message: "Error de registro: " + error.message };
      });
  }
};

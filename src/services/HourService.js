
export const hourService = {
    insert: (proyect,date,time_init,time_end,total,activity,summary) => {
      const employee_id = localStorage.getItem("id_user");  
      return fetch(`http://localhost:3001/hour/${employee_id}/${proyect}/${date}/${time_init}/${time_end}/${time_end}/${total}/${activity}/${summary}`)
        .then(response => response.json())
        .then(user => {
          console.log(user)
          if (user && user.id_empleado) {                        
            return { success: true};
          } else {            
            return { success: false};
          }
        })
        .catch(error => {          
          return { success: false, message: "Error de insercion: " + error.message };
        });
    }
  };
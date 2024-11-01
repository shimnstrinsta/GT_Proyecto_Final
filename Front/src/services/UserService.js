export const userService = {
    getEmployee: () => {
        const employee_id = localStorage.getItem("id_user"); 
        return fetch(`http://localhost:3001/employee/${employee_id}`, {
        })
        .then(response => response.json())
        .then(employee => {
            if (employee){
                return { success: true, employee };
            }
            else{
                return { success: false, employee: null };
            }
            })
            .catch(error => {          
                return { success: false, message: "Error de registro: " + error.message };
            });
    }
  };
  
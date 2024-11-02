export const summaryService = {
    dayWeek: async (employee_id) => {        
        console.log("Employee: "+employee_id)
        return fetch(`http://localhost:3001/summary/day/${employee_id}`)
            .then(response => response.json())
            .then(days => {                
                return {success: true, days}
            })
            .catch(error => {
                return { success: false, message: "Error de consultar horas: " + error.message };
            }
        );
    },
    proyect: async (employee_id) => {        
        console.log("Employee: "+employee_id)
        return fetch(`http://localhost:3001/summary/proyect/${employee_id}`)
            .then(response => response.json())
            .then(proyects => {                                
                return {success: true, proyects}
            })
            .catch(error => {
                return { success: false, message: "Error de consultar horas: " + error.message };
            }
        );
    },
    activity: async (employee_id) => {        
        console.log("Employee: "+employee_id)
        return fetch(`http://localhost:3001/summary/activity/${employee_id}`)
            .then(response => response.json())
            .then(activities => {                                
                return {success: true, activities}
            })
            .catch(error => {
                return { success: false, message: "Error de consultar horas: " + error.message };
            }
        );
    }

}
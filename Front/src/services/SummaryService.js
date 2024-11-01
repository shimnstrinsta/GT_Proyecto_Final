export const summaryService = {
    dayWeek: async () => {
        const employee_id = localStorage.getItem("id_user");

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
    proyect: async () => {
        const employee_id = localStorage.getItem("id_user");

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
    activity: async () => {
        const employee_id = localStorage.getItem("id_user");

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
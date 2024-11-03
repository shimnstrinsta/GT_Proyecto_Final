export const summaryService = {
    dayWeek: async (employee_id) => {
        if (employee_id != 0) {

            return fetch(`http://localhost:3001/summary/day/${employee_id}`)
                .then(response => response.json())
                .then(days => {
                    return { success: true, days }
                })
                .catch(error => {
                    return { success: false, message: "Error de consultar horas: " + error.message };
                }
                );
        }
        else {
            return fetch(`http://localhost:3001/summary/day`)
                .then(response => response.json())
                .then(days => {
                    return { success: true, days }
                })
                .catch(error => {
                    return { success: false, message: "Error de consultar horas: " + error.message };
                }
                );
        }
    },
    project: async (employee_id) => {
        if (employee_id != 0) {

            return fetch(`http://localhost:3001/summary/project/${employee_id}`)
                .then(response => response.json())
                .then(projects => {
                    return { success: true, projects }
                })
                .catch(error => {
                    return { success: false, message: "Error de consultar horas: " + error.message };
                }
                );
        } else {
            return fetch(`http://localhost:3001/summary/project`)
                .then(response => response.json())
                .then(projects => {
                    return { success: true, projects }
                })
                .catch(error => {
                    return { success: false, message: "Error de consultar horas: " + error.message };
                }
                );
        }
    },
    activity: async (employee_id) => {
        if (employee_id != 0) {

            return fetch(`http://localhost:3001/summary/activity/${employee_id}`)
                .then(response => response.json())
                .then(activities => {
                    return { success: true, activities }
                })
                .catch(error => {
                    return { success: false, message: "Error de consultar horas: " + error.message };
                }
                );
        }
        else {
            return fetch(`http://localhost:3001/summary/activity`)
                .then(response => response.json())
                .then(activities => {
                    return { success: true, activities }
                })
                .catch(error => {
                    return { success: false, message: "Error de consultar horas: " + error.message };
                }
                );
        }
    }

}
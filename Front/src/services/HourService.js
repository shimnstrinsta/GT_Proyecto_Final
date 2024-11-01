
export const hourService = {
    insert: async (proyect, time_init, time_end, activity, summary) => {

        let start = new Date(`1970-01-01T${time_init}`);
        let end = new Date(`1970-01-02T${time_end}`);

        if(time_init < time_end){
            start = new Date(`1970-01-01T${time_init}`);
            end = new Date(`1970-01-01T${time_end}`);
        }

        const employee_id = localStorage.getItem("id_user");
        const date_now = new Date();
        const date = `${date_now.getFullYear()}-${String(date_now.getMonth() + 1).padStart(2, '0')}-${String(date_now.getDate()).padStart(2, '0')}`

        console.log(date_now)
        console.log("Date: "+date)

        let diffMs = start - end;

        if (end > start) {
            diffMs = end - start;
        }
        else{
            diffMs = 24 * 60 * 60 * 1000 + (start - end);
        }

        const total = parseInt(diffMs / 1000 / 60);

        const data = {proyect, activity, date, total, time_init, time_end, summary}

        try {
            const response = await fetch("http://localhost:3001/hour/" + employee_id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Indica que el contenido es JSON
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(response.message);
            }

            return { success: true };

        } catch (error) {
            return { success: false, message: error.message };
        }

    },

    get: async () => {
        const employee_id = localStorage.getItem("id_user");
        
        return fetch(`http://localhost:3001/hour/${employee_id}`)
            .then(response => response.json())
            .then(hours => {
                return {success: true, hours}
            })
            .catch(error => {
                return { success: false, message: "Error de consultar horas: " + error.message };
            }
        );
    }
};
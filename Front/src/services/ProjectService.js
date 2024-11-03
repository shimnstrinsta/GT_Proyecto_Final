

export const projectService = {
    insert: async (name, date_beggin, date_end, description) => {        

        console.log(name,date_beggin,date_end,description)
        const data = {
            date_beggin: date_beggin,
            date_end:date_end,
            description:description
        }
        
        try {
            const response = await fetch(`http://localhost:3001/project/${name}`, {
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

}
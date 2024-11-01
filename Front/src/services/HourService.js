
export const hourService = {
  insert: async(proyect,time_init,time_end,activity,summary) => {

    const start = new Date(`1970-01-01T${time_init}`);
    const end = new Date(`1970-01-01T${time_end}`);
    const employee_id = localStorage.getItem("id_user");  
    const date_now = new Date();
    const date = `${date_now.getFullYear()}-${date_now.getMonth()}-${date_now.getDate()}`

    let diffMs = start - end;
    if(end > start){
        diffMs = end - start;
    }
    const total = parseInt(diffMs/1000/60);

    const data = {            
        proyect,
        activity,
        date,
        total,
        time_init,
        time_end,
        summary
    }

    try {
        const response = await fetch("http://localhost:3001/hour/"+employee_id, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' // Indica que el contenido es JSON
            },
            body: JSON.stringify(data) 
        });

        if (!response.ok) {
            throw new Error(response.message);
        }

        return {success: true}; 
        
    } catch (error) {            
        return { success: false, message: error.message };
    }

}

  };
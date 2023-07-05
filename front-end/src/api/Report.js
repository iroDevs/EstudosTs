import axios from 'axios';

const urlBase = "http://localhost:3333/api/"


export async function getReportUsersWithMovies(){
    try {

        const response = await axios.post(urlBase+'report',{
            filter: false,
            onlyUsers: false,
            filters: {
                idadeMaxima: 0,
                NomeContendo: ""
            }
         })
        console.log(response);
        return response

    } catch (error) {

        console.log(error)
        return error
    }
}


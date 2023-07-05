import axios from 'axios';

const urlBase = "http://localhost:3333/api/"


export async function getAllMovies(){
    try {

        const response = await axios.get(urlBase+'filme')
        console.log(response);
        return response

    } catch (error) {

        console.log(error)
        return error
    }
}


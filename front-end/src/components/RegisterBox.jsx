import React, { useEffect, useState } from 'react';
import { getAllMovies } from '../api/Movies'
import { getReportUsersWithMovies } from '../api/Report'
import {AiOutlineStar, AiFillStar } from 'react-icons/ai'


import './RegisterStyle.css'



const RegisterBox = () => {
    const [link , setLink] = useState("#")
    const [loading , setLoading] = useState(false)
    const [buttonText, setButtonText] = useState("Gerar relatorio")
    const [filmes , setFilmes] = useState([])

    const handleClick = ({target}) => {
        console.log(target);
        setLoading(true)
        setButtonText("carregando...")
        const getReport = async () => {
            const report = await getReportUsersWithMovies();
            const { data } = report.data;
            setLoading(false)
            setButtonText('Baixar Relatorio')
            setLink(data)
        }
    
        getReport()
    } 

    useEffect(() => {
       const getMoviesFromApi = async ()=> {
           const arrayFilmes = await getAllMovies();
           setFilmes(arrayFilmes.data.data)
       }

       getMoviesFromApi()
        
    },[])
    
    if (!filmes.length == 0) {     
        return (
            <>
                <h2 className='listMovie-title'>Filmes</h2>
                <ul className='list-movies'>
                    {filmes.map((element,index)=> {
                        return (
                            <li key={index}>
                                <div className='item-list'>
                                    <AiOutlineStar size={26} />   
                                    <p>ordem: {index+1}</p>
                                    <p>Nome: {element.titulo}</p>
                                    <p>Diretor: {element.diretor}</p>
                                    <p>Nota: {element.nota}</p>
                                    
                                </div>
                            </li>
                        );
                    })}
                </ul>

                <a  download={link} onClick={handleClick}disabled={loading} className='userSaveButton'>{buttonText}</a>
            </>
        );
    }else {
        return (
            <h1 className='loading'> Carregando </h1>
        ); 
    }
}

export default RegisterBox;

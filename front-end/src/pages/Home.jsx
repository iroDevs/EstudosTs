import React from 'react';
import Navbar from '../components/NavBar';
import RegisterBox from '../components/RegisterBox';

const Home = () => {
    return (
        <div className='main'>
            <Navbar></Navbar>
            <RegisterBox campos={['nome','idade']} entity={'usuario'} />
            <h1>Home</h1>
        </div>
    );
}

export default Home;

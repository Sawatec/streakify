import React from 'react';
import { useNavigate } from 'react-router-dom';
import TutorialElement from '../components/TutorialElement';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const navigateToHome = () => navigate('/');
    return (
        <div >
            <button
                onClick={navigateToHome}
            >
                X
            </button>
            <TutorialElement />
        </div>
    );
    }

export default Home;
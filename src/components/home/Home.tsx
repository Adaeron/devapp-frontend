import { useNavigate } from 'react-router-dom';
import { AbstractButton } from '../buttons/AbstractButton';

export const Home = () => {
    const navigate = useNavigate();
    const handleRedirectPersonas = () => {
        navigate('/personas');
    };
    const handleRedirectAutos = () => {
        navigate('/autos');
    };
    return (
        <>
            <AbstractButton color="rojo" content="Personas" callback={handleRedirectPersonas} key={'Personas'} />
            <AbstractButton color="azul" content="Autos" callback={handleRedirectAutos} key={'Autos'} />
        </>
    );
};

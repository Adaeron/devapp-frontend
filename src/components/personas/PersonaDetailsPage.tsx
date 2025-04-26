import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { buscarPersona } from '../../api/Personas';
import { PersonaDetails } from './PersonaDetails';
import { withId } from '../../model/UUID';
import { Persona } from '../../model/Persona';

export const PersonaDetailsPage = () => {
    const params = useParams<{ id: string }>();
    const [persona, setPersona] = useState<withId<Persona> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchPersona = async (idPersona: string) => {
        const personaEncontrada = await buscarPersona(idPersona);
        if (personaEncontrada.status === 200) {
            setPersona(personaEncontrada.data);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPersona(params.id!);
    }, [params.id]);
    console.log(params.id);
    return <>{isLoading ? <p>Cargando...</p> : <PersonaDetails persona={persona!} />}</>;
};

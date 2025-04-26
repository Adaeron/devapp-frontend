import { useEffect, useState } from 'react';
import { NewEntityButton } from '../buttons';
import { PersonasList } from './PersonasList';
import { listarPersonas } from '../../api/Personas';
import { withId } from '../../model/UUID';
import { Persona } from '../../model/Persona';
import { AtrasButton } from '../buttons/AtrasButton';

export const PersonasPage = () => {
    const [personas, setPersonas] = useState<withId<Persona>[]>([]);

    const fetchPersonas = async () => {
        const response = await listarPersonas();
        setPersonas(response);
    };

    useEffect(() => {
        fetchPersonas();
    }, []);

    return (
        <>
            <h1>Personas</h1>
            <AtrasButton />
            <NewEntityButton entityType="personas" isDisabled={false} />
            <PersonasList personas={personas} handleDelete={fetchPersonas} />
        </>
    );
};

import { useEffect, useState } from 'react';
import { listarAutos } from '../../api/Autos';
import { Auto } from '../../model/Auto';
import { NewEntityButton } from '../buttons';
import { AutosList } from './AutosList';
import { withId } from '../../model/UUID';
import { AtrasButton } from '../buttons/AtrasButton';

export const AutosPage = () => {
    const [autos, setAutos] = useState<withId<Auto>[]>([]);

    const fetchAutos = async () => {
        const response = await listarAutos();
        if (response.status === 200) {
            setAutos(response.data);
        }
    };

    useEffect(() => {
        fetchAutos();
    }, []);

    return (
        <>
            <h1>Autos</h1>
            <AtrasButton />
            <NewEntityButton entityType="autos" isDisabled={true} />
            <AutosList autos={autos} handleDelete={fetchAutos} />
        </>
    );
};

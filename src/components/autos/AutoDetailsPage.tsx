import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Auto } from '../../model/Auto';
import { withId } from '../../model/UUID';
import { buscarAuto } from '../../api/Autos';
import { AutoDetails } from './AutoDetails';

export const AutoDetailsPage = () => {
    const idAuto = useParams<{ id: string }>();
    const [auto, setAuto] = useState<withId<Auto> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchAuto = async (idAuto: string) => {
        const autoEncontrado = await buscarAuto(idAuto);
        if (autoEncontrado.status === 200) {
            setAuto(autoEncontrado.data);
            setIsLoading(false);
        }
        console.log(autoEncontrado.data);
    };

    useEffect(() => {
        fetchAuto(idAuto.id!);
    }, [idAuto.id]);

    return <>{isLoading ? <p>Cargando...</p> : <AutoDetails auto={auto!} />}</>;
};

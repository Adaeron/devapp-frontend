import { useEffect, useState } from 'react';
import { Persona } from '../../model/Persona';
import { EntityList } from '../lists/EntityList';
import { AutoListing } from '../../model/Auto';
import { withId } from '../../model/UUID';
import { buscarAutos } from '../../api/Autos';
import { AbstractButton, AtrasButton, NewEntityButton } from '../buttons';
import { useNavigate } from 'react-router-dom';
import { DeletePopup } from '../popup/DeletePopup';
import { borrarPersona } from '../../api/Personas';

type PersonaDetailsProps = {
    persona: withId<Persona>;
};

export const PersonaDetails: React.FC<PersonaDetailsProps> = ({ persona }) => {
    const [autos, setAutos] = useState<withId<AutoListing>[]>([]);
    const [showBorrarConfirmation, setShowBorrarConfirmation] = useState(false);
    const navigate = useNavigate();

    const fetchAutos = async (dni: string) => {
        const responseAutosList = await buscarAutos(dni);
        if (responseAutosList.status === 200) {
            setAutos(responseAutosList.data);
        }
    };
    const formatFecha = (fecha: string) => {
        const date = new Date(fecha);
        const dia = date.getUTCDate().toString().padStart(2, '0'); //devuelve un día de dos dígitos
        const mes = (date.getUTCMonth() + 1).toString().padStart(2, '0'); //devuelve de 0 a 11
        const anio = date.getUTCFullYear();
        return `${dia}/${mes}/${anio}`;
    };

    const handleEditar = () => {
        navigate(`/personas/edit/${persona._id}`);
    };

    const handleBorrarPersona = () => {
        setShowBorrarConfirmation(true);
    };

    const handleConfirmBorrarPersona = async () => {
        const response = await borrarPersona(persona._id);
        if (response.status === 201) {
            navigate(-1);
        }
    };

    const handleCancelBorrar = () => {
        setShowBorrarConfirmation(false);
    };

    const handleBorrarAuto = () => {
        fetchAutos(persona.dni);
    };

    useEffect(() => {
        fetchAutos(persona.dni);
    }, [persona.dni]);

    return (
        <>
            <div>
                <h3>Persona</h3>
                <AtrasButton />
                <p>Nombre: {persona.nombre}</p>
                <p>Apellido: {persona.apellido}</p>
                <p>DNI: {persona.dni}</p>
                <p>Fecha de nacimiento: {formatFecha(persona.fechaDeNacimiento)}</p>
                <p>Es donante: {persona.esDonante ? 'Si' : 'No'}</p>
                <p>Género: {persona.genero}</p>
            </div>
            <div>
                <h3>Autos</h3>
                <NewEntityButton entityType="autos" isDisabled={false} dniDuenio={persona.dni} />
                <EntityList entities={autos} entitiesType="autos" handleDelete={handleBorrarAuto} />
            </div>
            <AbstractButton color="amarillo" content="Editar" id={persona._id} callback={handleEditar} />
            <AbstractButton color="rojo" content="Borrar" id={persona._id} callback={handleBorrarPersona} />
            {showBorrarConfirmation && (
                <DeletePopup
                    confirmDeleteCallback={handleConfirmBorrarPersona}
                    cancelDeleteCallback={handleCancelBorrar}
                />
            )}
        </>
    );
};

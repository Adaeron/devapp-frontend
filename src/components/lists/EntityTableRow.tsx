import { useNavigate } from 'react-router-dom';
import { EntityListing } from '../../model/Entity';
import { withId } from '../../model/UUID';
import { AbstractButton } from '../buttons/AbstractButton';
import { EntityDataCell } from './EntityDataCell';
import { borrarPersona, buscarPersonaByDni } from '../../api/Personas';
import { useState } from 'react';
import { DeletePopup } from '../popup/DeletePopup';
import { borrarAuto } from '../../api/Autos';

type TableBodyProps = {
    entity: withId<EntityListing>;
    entityType: string;
    handleDelete: () => void;
};

export const EntityTableRow: React.FC<TableBodyProps> = ({ entity, entityType, handleDelete }) => {
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    //Guardo la entidad sin id ni dueño en caso de ser auto.
    let entityWithoutId: Partial<withId<EntityListing>> = {};
    //Separo de la entidad el ID y en caso de tener separo el dni del duenio.
    if ('duenio' in entity) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, duenio, ...rest } = entity;
        entityWithoutId = rest;
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = entity;
        entityWithoutId = rest;
    }

    const navigate = useNavigate();
    const handleEditar = () => {
        navigate(`/${entityType}/edit/${entity._id}`);
    };
    const handleVer = () => {
        navigate(`/${entityType}/${entity._id}`);
    };
    const handleBuscarDuenio = async (dniDuenio: string) => {
        const response = await buscarPersonaByDni(dniDuenio);
        if (response.status === 200) {
            const duenio = response.data;
            return duenio._id;
        }
    };
    const handleVerDuenio = async () => {
        //Si la entidad tiene propiedad 'duenio' busco el dueño de dicho auto.
        if ('duenio' in entity) {
            const dataDuenio = await handleBuscarDuenio(entity.duenio);
            navigate(`/personas/${dataDuenio}`);
        }
    };
    const handleBorrar = () => {
        setDeleteConfirmation(true);
    };
    const handleCancelDelete = () => {
        setDeleteConfirmation(false);
    };
    const handleConfirmDelete = async () => {
        if (entityType === 'autos') {
            await borrarAuto(entity._id);
            setDeleteConfirmation(false);
            handleDelete();
            navigate('/autos');
        }
        if (entityType === 'personas') {
            const response = await borrarPersona(entity._id);
            if (response.status === 201) {
                setDeleteConfirmation(false);
                handleDelete();
                navigate('/personas');
            }
        }
    };
    return (
        <>
            <tr>
                {Object.values(entityWithoutId).map((value) => (
                    <EntityDataCell key={value} content={value} />
                ))}
                <td key={entity._id} style={{ padding: '1px' }}>
                    <AbstractButton color="azul" id={entity._id} content="Ver" callback={handleVer} />
                    <AbstractButton color="amarillo" id={entity._id} content="Editar" callback={handleEditar} />
                    <AbstractButton color="rojo" id={entity._id} content="Borrar" callback={handleBorrar} />
                    {entityType === 'autos' ? (
                        <AbstractButton id={entity._id} content="Ver Dueño" callback={handleVerDuenio} color="gris" />
                    ) : (
                        <></>
                    )}
                </td>
            </tr>
            {deleteConfirmation && (
                <DeletePopup cancelDeleteCallback={handleCancelDelete} confirmDeleteCallback={handleConfirmDelete} />
            )}
        </>
    );
};

import { useNavigate } from 'react-router-dom';
import { Auto } from '../../model/Auto';
import { withId } from '../../model/UUID';
import { AbstractButton, AtrasButton } from '../buttons';
import { buscarPersonaByDni } from '../../api/Personas';
import { useState } from 'react';
import { borrarAuto } from '../../api/Autos';
import './../popup/styles.css';
import { DeletePopup } from '../popup/DeletePopup';

type AutoDetailsProps = {
    auto: withId<Auto>;
};

export const AutoDetails: React.FC<AutoDetailsProps> = ({ auto }) => {
    const navigate = useNavigate();
    const [showBorrarConfirmation, setShowBorrarConfirmation] = useState(false);

    const handleBorrarAuto = () => {
        setShowBorrarConfirmation(true);
    };
    const handleConfirmBorrar = async () => {
        const response = await borrarAuto(auto._id);
        if (response.status === 201) {
            navigate('/autos');
        }
    };
    const handleCloseConfirmation = () => {
        setShowBorrarConfirmation(false);
    };
    const handleVerDuenio = async () => {
        const response = await buscarPersonaByDni(auto.duenio);
        if (response.status === 200) {
            const duenio = response.data;
            navigate(`/personas/${duenio._id}`);
        }
    };
    const handleEditar = () => {
        navigate(`/autos/edit/${auto._id}`);
    };

    return (
        <>
            <div>
                <h1>Detalles Auto</h1>
                <h5>
                    Marca: <p>{auto.marca}</p>
                </h5>
                <h5>
                    Modelo: <p>{auto.modelo}</p>
                </h5>
                <h5>
                    Patente: <p>{auto.patente}</p>
                </h5>
                <h5>
                    Color: <p>{auto.color}</p>
                </h5>
                <h5>
                    Año: <p>{auto.anio}</p>
                </h5>
                <h5>
                    Motor: <p>{auto.motor}</p>
                </h5>
                <h5>
                    Número de chasis: <p>{auto.numeroChasis}</p>
                </h5>
            </div>
            <div>
                <AbstractButton id={auto._id} content="Ver Dueño" callback={handleVerDuenio} color="gris" />
                <AbstractButton color="amarillo" id={auto._id} content="Editar" callback={handleEditar} />
                <AbstractButton color="rojo" content="Borrar" id={auto._id} callback={handleBorrarAuto} />
                <AtrasButton />
            </div>
            {showBorrarConfirmation && (
                <DeletePopup
                    cancelDeleteCallback={handleCloseConfirmation}
                    confirmDeleteCallback={handleConfirmBorrar}
                />
            )}
        </>
    );
};

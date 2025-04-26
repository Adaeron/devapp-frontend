import { AbstractButton } from '../buttons';
import './styles.css';

type DeletePopupProps = {
    confirmDeleteCallback: () => void;
    cancelDeleteCallback: () => void;
};

export const DeletePopup: React.FC<DeletePopupProps> = ({ confirmDeleteCallback, cancelDeleteCallback }) => {
    return (
        <div className="confirmation-overlay">
            <div className="confirmation-popup">
                <p>¿Estás seguro de borrar este recurso?</p>
                <AbstractButton content="Borrar" color="Rojo" callback={confirmDeleteCallback} />
                <AbstractButton content="Cancelar" color="" callback={cancelDeleteCallback} />
            </div>
        </div>
    );
};

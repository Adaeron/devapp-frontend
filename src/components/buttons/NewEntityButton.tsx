import { useNavigate } from 'react-router-dom';

type NewPersonaButtonProps = {
    entityType: string;
    isDisabled: boolean;
    dniDuenio?: string;
};

export const NewEntityButton: React.FC<NewPersonaButtonProps> = ({ entityType, isDisabled, dniDuenio }) => {
    const navigate = useNavigate();

    const handleNewEntity = () => {
        if (entityType === 'autos') {
            navigate(`/${entityType}/new`, { state: { dniDuenio } });
            return;
        }
        navigate(`/${entityType}/new`);
    };
    return (
        <button
            type="button"
            onClick={handleNewEntity}
            className="btn btn-success"
            data-bs-toggle="button"
            disabled={isDisabled}
        >
            {entityType === 'autos' ? <span>Agregar nuevo</span> : <span>Agregar nueva</span>}
        </button>
    );
};

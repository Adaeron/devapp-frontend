import { useNavigate } from 'react-router-dom';

export const AtrasButton = () => {
    const navigate = useNavigate();
    return (
        <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
                navigate(-1);
            }}
        >
            Ir Atrás
        </button>
    );
};

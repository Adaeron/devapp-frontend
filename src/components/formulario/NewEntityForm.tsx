import { PersonaNewForm } from '../personas/PersonaNewForm';
import { AutoNewForm } from '../autos/AutoNewForm';

type NewEntityFormProps = {
    entityType: string;
};

export const NewEntityForm: React.FC<NewEntityFormProps> = ({ entityType }) => {
    return entityType === 'personas' ? (
        <div>
            <PersonaNewForm />
        </div>
    ) : (
        <>
            <AutoNewForm />
        </>
    );
};

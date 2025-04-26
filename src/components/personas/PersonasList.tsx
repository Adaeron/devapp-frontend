import { PersonaListing } from '../../model/Persona';
import { withId } from '../../model/UUID';
import { EntityList } from '../lists/EntityList';

type PersonasListProps = {
    personas: withId<PersonaListing>[];
    handleDelete: () => void;
};

export const PersonasList: React.FC<PersonasListProps> = ({ personas, handleDelete }) => {
    return <EntityList entities={personas} entitiesType="personas" handleDelete={handleDelete} />;
};

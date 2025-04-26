import { Auto } from '../../model/Auto';
import { withId } from '../../model/UUID';
import { EntityTable } from '../lists/EntityTable';

type AutosListProps = {
    autos: withId<Auto>[];
    handleDelete: () => void;
};

export const AutosList: React.FC<AutosListProps> = ({ autos, handleDelete }) => {
    return <EntityTable entities={autos} entitiesType="autos" handleDelete={handleDelete} />;
};

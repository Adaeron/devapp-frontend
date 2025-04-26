import { EntityListing } from '../../model/Entity';
import { withId } from '../../model/UUID';
import { EntityTable } from './EntityTable';

type EntityListProps = {
    entities: withId<EntityListing>[];
    entitiesType: string;
    handleDelete: () => void;
};

export const EntityList: React.FC<EntityListProps> = ({ entities, entitiesType, handleDelete }) => {
    return <EntityTable entities={entities} entitiesType={entitiesType} handleDelete={handleDelete} />;
};

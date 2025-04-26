import { EntityListing } from '../../model/Entity';
import { withId } from '../../model/UUID';
import { EntityTableHeader } from './EntityTableHeader';
import { EntityTableRow } from './EntityTableRow';

type EntityTableProps = {
    entities: withId<EntityListing>[];
    entitiesType: string;
    handleDelete: () => void;
};

export const EntityTable: React.FC<EntityTableProps> = ({ entities, entitiesType, handleDelete }) => {
    const headers = new Set<string>();
    entities.map((entity) => Object.keys(entity).forEach((key) => headers.add(key)));
    const headersArray = Array.from(headers);
    return (
        <table className="table table-hover">
            <EntityTableHeader headers={headersArray} />
            <tbody>
                {entities.map((entity) => (
                    <EntityTableRow
                        key={entity._id}
                        entity={entity}
                        entityType={entitiesType}
                        handleDelete={handleDelete}
                    />
                ))}
            </tbody>
        </table>
    );
};

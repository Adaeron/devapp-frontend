import React from 'react';
import { TableHeader } from './TableHeader';

type EntityTableHeaderProps = {
    headers: string[];
};

export const EntityTableHeader: React.FC<EntityTableHeaderProps> = ({ headers }) => {
    return (
        <thead>
            <tr>
                {headers.map((key) => {
                    if (key !== '_id' && key !== 'autos' && key !== 'duenio') {
                        return <TableHeader key={key} content={key} />;
                    }
                })}
                <th scope="col">Acciones</th>
            </tr>
        </thead>
    );
};

type EntityDataCellProps = {
    content: string | number;
};

export const EntityDataCell: React.FC<EntityDataCellProps> = ({ content }) => {
    return <td>{content}</td>;
};

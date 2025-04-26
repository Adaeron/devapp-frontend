type TableHeaderProps = {
    content: string;
};

export const TableHeader: React.FC<TableHeaderProps> = ({ content }) => {
    return <th scope="col">{content}</th>;
};

type AbstractButtonProps = {
    id?: string;
    content: string;
    color?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (...args: any[]) => void | Promise<void>;
};

const colorPick = (color?: string): string => {
    switch (color?.toLocaleLowerCase()) {
        case 'rojo':
            return 'btn-danger';
        case 'azul':
            return 'btn-info';
        case 'amarillo':
            return 'btn-warning';
        case 'verde':
            return 'btn-success';
        default:
            return 'btn-secondary';
    }
};

export const AbstractButton: React.FC<AbstractButtonProps> = ({ content, color, callback }) => {
    const className = `btn ${colorPick(color!)}`;
    const handleClick = () => {
        callback();
    };

    return (
        <button type="button" onClick={handleClick} className={className}>
            {content}
        </button>
    );
};

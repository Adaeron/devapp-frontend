import { Auto } from '../../model/Auto';

type AutoRowProps = Auto;

export const AutoRow: React.FC<AutoRowProps> = ({ marca, modelo, patente }) => {
    return (
        <tr>
            <td>{marca}</td>
            <td>{modelo}</td>
            <td>{patente}</td>
            <td>botones</td>
        </tr>
    );
};

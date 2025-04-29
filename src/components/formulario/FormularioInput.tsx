interface BaseInputProps {
    inputType: 'text' | 'number' | 'date';
    labelContent: string;
    inputRef: React.RefObject<HTMLInputElement | null>;
    required?: boolean;
    defaultContent?: string | number;
}

interface SelectInputProps {
    inputType: 'select';
    labelContent: string;
    inputRef: React.RefObject<HTMLSelectElement | null>;
    required?: boolean;
    defaultContent?: string;
}

type FormularioInputProps = BaseInputProps | SelectInputProps;

export const FormularioInput: React.FC<FormularioInputProps> = ({
    inputType,
    defaultContent,
    labelContent,
    inputRef,
    required
}) => {
    return inputType === 'select' ? (
        <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
                {labelContent}
            </label>
            <select id="genero" ref={inputRef} defaultValue={defaultContent}>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="No-Binario">No Binario</option>
            </select>
        </div>
    ) : (
        <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
                {labelContent}
            </label>
            <input
                className="form-control"
                type={inputType}
                id={'input' + labelContent}
                aria-describedby="nameHelp"
                ref={inputRef}
                required={required}
                defaultValue={defaultContent}
            />
        </div>
    );
};

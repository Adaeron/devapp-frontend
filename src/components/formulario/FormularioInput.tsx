interface FormularioInputProps {
    inputType: string;
    defaultContent?: string;
    labelContent: string;
    inputRef: React.RefObject<HTMLInputElement | HTMLSelectElement>;
    required: boolean;
}

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

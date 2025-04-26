import { FormEvent, useRef } from 'react';
import { AbstractButton, AtrasButton } from '../buttons';
import { FormularioInput } from '../formulario/FormularioInput';
import { Persona } from '../../model/Persona';
import { crearPersona } from '../../api/Personas';
import { useNavigate } from 'react-router-dom';

export const PersonaNewForm = () => {
    const navigate = useNavigate();

    const nombreRef = useRef<HTMLInputElement>(null);
    const apellidoRef = useRef<HTMLInputElement>(null);
    const dniRef = useRef<HTMLInputElement>(null);
    const fechaNacimientoRef = useRef<HTMLInputElement>(null);
    const generoRef = useRef<HTMLSelectElement>(null);
    const esDonanteRef = useRef<HTMLInputElement>(null);

    const handleCrearPersona = async (persona: Persona) => {
        const response = await crearPersona(persona);
        if (response.status === 200) {
            navigate('/personas');
        }
    };

    const handleSubmitAndRedirect = (event: FormEvent) => {
        event.preventDefault();
        const newPersona: Persona = {
            nombre: nombreRef.current!.value,
            apellido: apellidoRef.current!.value,
            dni: dniRef.current!.value,
            fechaDeNacimiento: fechaNacimientoRef.current!.value,
            genero: generoRef.current!.value,
            esDonante: esDonanteRef.current!.checked,
            autos: Array<string>()
        };
        handleCrearPersona(newPersona);
    };

    return (
        <div>
            <h3>Nueva Persona</h3>
            <form onSubmit={handleSubmitAndRedirect}>
                <FormularioInput inputType="text" labelContent="Nombre" inputRef={nombreRef} required />
                <FormularioInput inputType="text" labelContent="Apellido" inputRef={apellidoRef} required />
                <FormularioInput inputType="text" labelContent="DNI" inputRef={dniRef} required />
                <FormularioInput
                    inputType="date"
                    labelContent="Fecha de nacimiento"
                    inputRef={fechaNacimientoRef}
                    required
                />
                <label className="form-label">Es donante </label>
                <input className="form-check" type="checkbox" ref={esDonanteRef} />
                <FormularioInput inputType="select" inputRef={generoRef} labelContent="Género" required />
                <AbstractButton color="verde" content="Crear" callback={handleSubmitAndRedirect} />
                <AtrasButton />
            </form>
        </div>
    );
};

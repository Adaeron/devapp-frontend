import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Persona } from '../../model/Persona';
import { buscarPersona, crearPersona, editarPersona } from '../../api/Personas';
import { FormularioInput } from '../formulario/FormularioInput';
import { AtrasButton } from '../buttons';
import { withId } from '../../model/UUID';
import { EntityList } from '../lists/EntityList';
import { AutoListing } from '../../model/Auto';
import { buscarAutos } from '../../api/Autos';
import { formatFechaEdit } from '../../aux/formatFecha';

type PersonaFormProps = {
    isEdit: boolean;
};

export const PersonaForm: React.FC<PersonaFormProps> = ({ isEdit }) => {
    const navigate = useNavigate();
    //Si es edición, tomo el ID de los parámetros del path.
    const params = useParams<{ id: string }>();
    const [persona, setPersona] = useState<withId<Persona>>();
    const [autos, setAutos] = useState<withId<AutoListing>[]>([]);

    //Refs de persona
    const nombreRef = useRef<HTMLInputElement>(null);
    const apellidoRef = useRef<HTMLInputElement>(null);
    const dniRef = useRef<HTMLInputElement>(null);
    const fechaNacimientoRef = useRef<HTMLInputElement>(null);
    const generoRef = useRef<HTMLSelectElement>(null);
    const esDonanteRef = useRef<HTMLInputElement>(null);

    const handleCrearPersona = async (persona: Persona) => {
        const response = await crearPersona(persona);
        if (response.status === 201) {
            navigate('/personas');
        }
    };

    const handleEditarPersona = async (persona: Persona) => {
        const response = await editarPersona(params.id!, persona);
        if (response.status === 201) {
            navigate('/personas');
        }
    };

    const handleSubmitAndRedirect = (event: FormEvent) => {
        event.preventDefault();
        if (isEdit) {
            const personaEditData: Persona = {
                nombre: nombreRef.current!.value,
                apellido: apellidoRef.current!.value,
                dni: dniRef.current!.value,
                fechaDeNacimiento: fechaNacimientoRef.current!.value,
                genero: generoRef.current!.value,
                esDonante: esDonanteRef.current!.checked,
                autos: persona!.autos || []
            };
            handleEditarPersona(personaEditData);
        } else {
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
        }
    };

    const fetchPersona = async (id: string) => {
        const response = await buscarPersona(id);
        if (response.status === 200) {
            setPersona(response.data);
            if (response.data?.dni) {
                fetchAutos(response.data.dni);
            }
        }
    };

    const fetchAutos = async (dni: string) => {
        const response = await buscarAutos(dni);
        if (response.status === 200) {
            setAutos(response.data);
        }
    };

    const handleDelete = () => {
        fetchPersona(params.id!);
    };

    useEffect(() => {
        if (isEdit && params.id) {
            fetchPersona(params.id!);
        }
    }, [params.id, isEdit]);
    return isEdit ? (
        !persona ? (
            <div>Cargando...</div>
        ) : (
            <div>
                <h3>Editar Persona</h3>
                <form onSubmit={handleSubmitAndRedirect}>
                    <FormularioInput
                        inputType="text"
                        labelContent="Nombre"
                        defaultContent={persona?.nombre}
                        inputRef={nombreRef}
                    />
                    <FormularioInput
                        inputType="text"
                        labelContent="Apellido"
                        defaultContent={persona?.apellido}
                        inputRef={apellidoRef}
                    />
                    <FormularioInput
                        inputType="text"
                        labelContent="DNI"
                        defaultContent={persona?.dni}
                        inputRef={dniRef}
                    />
                    <FormularioInput
                        inputType="date"
                        labelContent="Fecha de nacimiento"
                        defaultContent={persona?.fechaDeNacimiento ? formatFechaEdit(persona.fechaDeNacimiento) : ' '}
                        inputRef={fechaNacimientoRef}
                    />
                    <label className="form-label">Es donante </label>
                    <input
                        className="form-check"
                        type="checkbox"
                        ref={esDonanteRef}
                        defaultChecked={persona.esDonante}
                    />
                    <FormularioInput
                        inputType="select"
                        inputRef={generoRef}
                        labelContent="Género"
                        defaultContent={persona?.genero}
                    />
                    <div>
                        <EntityList entitiesType="autos" entities={autos!} handleDelete={handleDelete} />
                    </div>
                    <button type="submit" className="btn btn-success">
                        Guardar
                    </button>
                    <AtrasButton />
                </form>
            </div>
        )
    ) : (
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
                <button type="submit" className="btn btn-success">
                    Crear
                </button>
                <AtrasButton />
            </form>
        </div>
    );
};

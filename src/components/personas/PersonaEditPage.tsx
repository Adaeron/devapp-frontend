import { Persona } from '../../model/Persona';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { withId } from '../../model/UUID';
import { useNavigate, useParams } from 'react-router-dom';
import { buscarPersona, editarPersona } from '../../api/Personas';
import { AtrasButton } from '../buttons';
import { EntityList } from '../lists/EntityList';
import { AutoListing } from '../../model/Auto';
import { buscarAutos } from '../../api/Autos';
import { formatFecha } from '../../aux/formatFecha';

export const PersonaEditPage = () => {
    const params = useParams<{ id: string }>();
    const [persona, setPersona] = useState<withId<Persona>>();
    const [autos, setAutos] = useState<withId<AutoListing>[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    //Estados persona
    const [esDonante, setEsDonante] = useState<boolean>(false);
    const [genero, setGenero] = useState<string>('');
    const [fechaDeNacimiento, setFechaDeNacimiento] = useState('');
    //Refs
    const nombreRef = useRef<HTMLInputElement>(null);
    const apellidoRef = useRef<HTMLInputElement>(null);
    const dniRef = useRef<HTMLInputElement>(null);
    const generoRef = useRef<HTMLSelectElement>(null);
    const esDonanteRef = useRef<HTMLInputElement>(null);
    const fechaNacimientoRef = useRef<HTMLInputElement>(null);

    //Handlers de cambio por eventos
    const handleDonanteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEsDonante(event.target.checked);
    };

    const handleGeneroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGenero(event.target.value);
    };

    const handleFechaDeNacimientoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFechaDeNacimiento(event.target.value);
    };

    const handleSubmitAndRedirect = async (event: FormEvent) => {
        event.preventDefault();
        const personaEditData: Partial<Persona> = {};
        if (nombreRef.current?.value !== persona?.nombre) {
            personaEditData.nombre = nombreRef.current?.value || undefined;
        }
        if (apellidoRef.current?.value !== persona?.apellido) {
            personaEditData.apellido = apellidoRef.current?.value || undefined;
        }
        if (dniRef.current?.value !== persona?.dni) {
            personaEditData.dni = dniRef.current?.value || undefined;
        }
        if (fechaNacimientoRef.current?.value !== formatFecha(persona?.fechaDeNacimiento || '')) {
            personaEditData.fechaDeNacimiento = fechaNacimientoRef.current?.value || undefined;
        }
        if (generoRef.current?.value !== persona?.genero) {
            personaEditData.genero = generoRef.current?.value || undefined;
        }
        if (esDonante !== persona?.esDonante) {
            personaEditData.esDonante = esDonante;
        }
        const response = await editarPersona(persona!._id, personaEditData);
        console.log(response);
        if (response.status === 201) {
            navigate('/personas');
        }
    };

    const fetchPersona = async (id: string) => {
        const response = await buscarPersona(id);
        const autosResponse = await buscarAutos(response.data.dni);
        if (response.status === 200) {
            setPersona(response.data);
            setAutos(autosResponse.data);
            setIsLoading(false);
            setGenero(persona!.genero);
            setEsDonante(persona!.esDonante);
        }
    };

    useEffect(() => {
        fetchPersona(params.id!);
    }, [params.id]);
    console.log('Renderizando');
    return (
        <>
            {isLoading ? (
                <h3>Cargando...</h3>
            ) : (
                <div>
                    <div>
                        <h3>Editar persona</h3>
                        <form onSubmit={handleSubmitAndRedirect}>
                            <b>Nombre: </b>
                            <input type="text" placeholder={persona?.nombre} name="nombre" ref={nombreRef} />
                            <br></br>
                            <b>Apellido: </b>
                            <input type="text" placeholder={persona?.apellido} name="apellido" ref={apellidoRef} />
                            <br></br>
                            <b>DNI: </b>
                            <input type="text" placeholder={persona!.dni} name="dni" ref={dniRef} />
                            <br></br>
                            <b>Fecha de nacimiento: </b>
                            <input
                                type="date"
                                placeholder={formatFecha(persona!.fechaDeNacimiento) || ''}
                                value={fechaDeNacimiento}
                                name="fechaDeNacimiento"
                                ref={fechaNacimientoRef}
                                onChange={handleFechaDeNacimientoChange}
                            />
                            <div>
                                <b>Es donante: </b>
                                <input
                                    type="checkbox"
                                    checked={esDonante}
                                    name="esDonante"
                                    ref={esDonanteRef}
                                    onChange={handleDonanteChange}
                                />
                            </div>
                            <b>Género: </b>
                            <select id="genero" value={genero} ref={generoRef} onChange={handleGeneroChange}>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="No-Binario">No Binario</option>
                            </select>
                            <div>
                                <button type="submit" className="btn btn-success">
                                    Guardar
                                </button>
                            </div>
                        </form>
                        <AtrasButton />
                    </div>
                    <div>
                        <EntityList entitiesType="autos" entities={autos!} />
                    </div>
                </div>
            )}
        </>
    );
};

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Auto } from '../../model/Auto';
import { FormularioInput } from '../formulario/FormularioInput';
import { AtrasButton } from '../buttons';
import { withId } from '../../model/UUID';
import { buscarAuto, crearAuto, editarAuto } from '../../api/Autos';

type AutoFormProps = {
    isEdit: boolean;
};

export const AutoForm: React.FC<AutoFormProps> = ({ isEdit }) => {
    const navigate = useNavigate();
    const location = useLocation();
    //Si es edición, tomo el ID de los parámetros del path.
    const params = useParams<{ id: string }>();
    const [auto, setAuto] = useState<withId<Auto>>();
    const dniDuenioNewAuto: string = location.state?.dniDuenio;

    //Refs de persona
    const marcaRef = useRef<HTMLInputElement>(null);
    const modeloRef = useRef<HTMLInputElement>(null);
    const anioRef = useRef<HTMLInputElement>(null);
    const patenteRef = useRef<HTMLInputElement>(null);
    const colorRef = useRef<HTMLInputElement>(null);
    const chasisRef = useRef<HTMLInputElement>(null);
    const motorRef = useRef<HTMLInputElement>(null);

    const handleCrearAuto = async (auto: Auto) => {
        const response = await crearAuto(auto);
        if (response.status === 200) {
            navigate('/autos');
        }
    };

    const handleEditarAuto = async (auto: Auto) => {
        const response = await editarAuto(params.id!, auto);
        if (response.status === 201) {
            navigate('/autos');
        }
    };

    const handleSubmitAndRedirect = (event: FormEvent) => {
        event.preventDefault();
        if (isEdit) {
            const autoEditData: Auto = {
                marca: marcaRef.current!.value,
                modelo: modeloRef.current!.value,
                anio: Number(anioRef.current!.value),
                patente: patenteRef.current!.value,
                color: colorRef.current!.value,
                numeroChasis: chasisRef.current!.value,
                motor: motorRef.current!.value,
                duenio: auto!.duenio
            };
            handleEditarAuto(autoEditData);
        } else {
            const newAuto: Auto = {
                marca: marcaRef.current!.value,
                modelo: modeloRef.current!.value,
                anio: Number(anioRef.current!.value),
                patente: patenteRef.current!.value,
                color: colorRef.current!.value,
                numeroChasis: chasisRef.current!.value,
                motor: motorRef.current!.value,
                duenio: dniDuenioNewAuto!
            };
            handleCrearAuto(newAuto);
        }
    };

    const fetchAuto = async (id: string) => {
        const response = await buscarAuto(id);
        if (response.status === 200) {
            setAuto(response.data);
        }
    };

    useEffect(() => {
        if (isEdit && params.id) {
            fetchAuto(params.id!);
            console.log(location.state.dniDuenio);
        }
    }, [params.id, isEdit, location.state.dniDuenio]);
    return isEdit ? (
        !auto ? (
            <div>Cargando...</div>
        ) : (
            <div>
                <h3>Editar Auto</h3>
                <form onSubmit={handleSubmitAndRedirect}>
                    <FormularioInput
                        inputType="text"
                        labelContent="Marca"
                        defaultContent={auto.marca}
                        inputRef={marcaRef}
                    />
                    <FormularioInput
                        inputType="text"
                        labelContent="Modelo"
                        defaultContent={auto.modelo}
                        inputRef={modeloRef}
                    />
                    <FormularioInput
                        inputType="number"
                        labelContent="Año"
                        defaultContent={auto.anio}
                        inputRef={anioRef}
                    />
                    <FormularioInput
                        inputType="text"
                        labelContent="Color"
                        defaultContent={auto.color}
                        inputRef={colorRef}
                    />
                    <FormularioInput
                        inputType="text"
                        labelContent="Patente"
                        inputRef={patenteRef}
                        defaultContent={auto.patente}
                    />
                    <FormularioInput
                        inputType="text"
                        inputRef={chasisRef}
                        labelContent="Número de chasis"
                        defaultContent={auto.numeroChasis}
                    />
                    <FormularioInput
                        inputType="text"
                        inputRef={motorRef}
                        labelContent="Número de motor"
                        defaultContent={auto.motor}
                    />
                    <button type="submit" className="btn btn-success">
                        Guardar
                    </button>
                    <AtrasButton />
                </form>
            </div>
        )
    ) : (
        <div>
            <h3>Nuevo Auto</h3>
            <form onSubmit={handleSubmitAndRedirect}>
                <FormularioInput inputType="text" labelContent="Marca" inputRef={marcaRef} required />
                <FormularioInput inputType="text" labelContent="Modelo" inputRef={modeloRef} required />
                <FormularioInput inputType="number" labelContent="Año" inputRef={anioRef} required />
                <FormularioInput inputType="text" labelContent="Patente" inputRef={patenteRef} required />
                <FormularioInput inputType="text" labelContent="Color" inputRef={colorRef} required />
                <FormularioInput inputType="text" labelContent="Número de chasis" inputRef={chasisRef} required />
                <FormularioInput inputType="text" labelContent="Número de motor" inputRef={motorRef} required />
                <button type="submit" className="btn btn-success">
                    Crear
                </button>
                <AtrasButton />
            </form>
        </div>
    );
};

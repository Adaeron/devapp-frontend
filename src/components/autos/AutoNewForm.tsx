import { FormEvent, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { crearAuto } from '../../api/Autos';
import { Auto } from '../../model/Auto';
import { FormularioInput } from '../formulario/FormularioInput';
import { AtrasButton } from '../buttons';

export const AutoNewForm = () => {
    const location = useLocation();
    const dniDuenio = location.state?.dniDuenio;
    const navigate = useNavigate();

    const marcaRef = useRef<HTMLInputElement>(null);
    const modeloRef = useRef<HTMLInputElement>(null);
    const anioRef = useRef<HTMLInputElement>(null);
    const patenteRef = useRef<HTMLInputElement>(null);
    const colorRef = useRef<HTMLInputElement>(null);
    const motorRef = useRef<HTMLInputElement>(null);
    const chasisRef = useRef<HTMLInputElement>(null);

    const handleCrearAuto = async (auto: Auto) => {
        const response = await crearAuto(auto);
        if (response.status === 200) {
            navigate(-1);
        }
    };

    const handleSubmitAndRedirect = (event: FormEvent) => {
        event.preventDefault();
        const newAuto = {
            marca: marcaRef.current!.value,
            modelo: modeloRef.current!.value,
            anio: Number(anioRef.current!.value),
            patente: patenteRef.current!.value,
            color: colorRef.current!.value,
            numeroChasis: chasisRef.current!.value,
            motor: motorRef.current!.value,
            duenio: dniDuenio
        };
        handleCrearAuto(newAuto);
    };

    return (
        <div>
            <h3>Nuevo Auto</h3>
            <form onSubmit={handleSubmitAndRedirect}>
                <FormularioInput inputType="text" labelContent="Marca" inputRef={marcaRef} required />
                <FormularioInput inputType="text" labelContent="Modelo" inputRef={modeloRef} required />
                <FormularioInput inputType="number" labelContent="Año" inputRef={anioRef} required />
                <FormularioInput inputType="text" labelContent="Color" inputRef={colorRef} required />
                <FormularioInput inputType="text" inputRef={patenteRef} labelContent="Patente" required />
                <FormularioInput inputType="text" inputRef={chasisRef} labelContent="Chasis" required />
                <FormularioInput inputType="text" inputRef={motorRef} labelContent="Motor" required />
                <button className="btn btn-success" type="submit">
                    Crear nuevo
                </button>
                <AtrasButton />
            </form>
        </div>
    );
};

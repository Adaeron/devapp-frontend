import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Auto } from '../../model/Auto';
import { withId } from '../../model/UUID';
import { buscarAuto, editarAuto } from '../../api/Autos';
import { AtrasButton } from '../buttons';

export const AutoEditPage = () => {
    const params = useParams<{ id: string }>();
    const [auto, setAuto] = useState<withId<Auto>>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    //Refs
    const marcaRef = useRef<HTMLInputElement>(null);
    const modeloRef = useRef<HTMLInputElement>(null);
    const anioRef = useRef<HTMLInputElement>(null);
    const patenteRef = useRef<HTMLInputElement>(null);
    const colorRef = useRef<HTMLInputElement>(null);
    const motorRef = useRef<HTMLInputElement>(null);
    const chasisRef = useRef<HTMLInputElement>(null);

    const handleSubmitAndRedirect = async (event: FormEvent) => {
        event.preventDefault();
        const autoEditData: Partial<Auto> = {};
        if (marcaRef.current?.value !== auto?.marca) {
            autoEditData.marca = marcaRef.current?.value || undefined;
        }
        if (modeloRef.current?.value !== auto?.modelo) {
            autoEditData.modelo = modeloRef.current?.value || undefined;
        }
        if (anioRef.current?.value !== auto?.anio) {
            autoEditData.anio = Number(anioRef.current?.value) || undefined;
        }
        if (colorRef.current?.value !== auto?.color) {
            autoEditData.color = colorRef.current?.value || undefined;
        }
        if (patenteRef.current?.value !== auto?.patente) {
            autoEditData.patente = patenteRef.current?.value || undefined;
        }
        if (chasisRef.current?.value !== auto?.numeroChasis) {
            autoEditData.numeroChasis = chasisRef.current?.value || undefined;
        }
        const response = await editarAuto(auto!._id, autoEditData);
        console.log(response);
        if (response.status === 201) {
            navigate('/autos');
        }
    };

    const fetchAuto = async (id: string) => {
        const autoResponse = await buscarAuto(id);
        if (autoResponse.status === 200) {
            setAuto(autoResponse.data);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAuto(params.id!);
    }, [params.id]);
    console.log('Renderizando');
    return (
        <>
            {isLoading ? (
                <h3>Cargando...</h3>
            ) : (
                <div>
                    <div>
                        <h3>Editar auto</h3>
                        <form onSubmit={handleSubmitAndRedirect}>
                            <b>Marca: </b>
                            <input type="text" placeholder={auto?.marca} name="marca" ref={marcaRef} />
                            <br></br>
                            <b>Modelo: </b>
                            <input type="text" placeholder={auto?.modelo} name="modelo" ref={modeloRef} />
                            <br></br>
                            <b>Año: </b>
                            <input type="number" placeholder={auto?.anio?.toString()} name="anio" ref={anioRef} />
                            <br></br>
                            <b>Color: </b>
                            <input type="text" placeholder={auto?.color} name="color" ref={colorRef} />
                            <br></br>
                            <b>Patente: </b>
                            <input type="text" name="patente" placeholder={auto?.patente} ref={patenteRef} />
                            <br></br>
                            <b>Número de chasis: </b>
                            <input type="text" name="chasis" placeholder={auto?.numeroChasis} ref={chasisRef} />
                            <br></br>
                            <b>Motor: </b>
                            <input type="text" name="motor" placeholder={auto?.motor} ref={motorRef} />
                            <br></br>
                            <button type="submit" className="btn btn-success">
                                Guardar
                            </button>
                        </form>
                        <AtrasButton />
                    </div>
                </div>
            )}
        </>
    );
};

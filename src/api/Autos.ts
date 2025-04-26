import api from './Api';
import { Auto, AutoListing } from '../model/Auto';
import { withId } from '../model/UUID';

const AUTOS_URL = '/autos';

export const listarAutos = async () => {
    const response = await api.get<withId<Auto>[]>(AUTOS_URL);
    return response.data;
};

export const buscarAuto = async (id: string) => {
    const response = await api.get<withId<Auto>>(`${AUTOS_URL}/${id}`);
    return response;
};

export const buscarAutos = async (dniDuenio: string) => {
    const response = await api.get<withId<AutoListing>[]>(`${AUTOS_URL}/?dniDuenio=${dniDuenio}`);
    return response;
};

export const crearAuto = async (auto: Auto) => {
    const response = await api.post(`${AUTOS_URL}`, auto, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
};

export const borrarAuto = async (idAuto: string) => {
    const response = await api.delete(`${AUTOS_URL}/${idAuto}`);
    return response;
};

export const editarAuto = async (idAuto: string, editData: Partial<Auto>) => {
    const response = await api.put(`${AUTOS_URL}/${idAuto}`, JSON.stringify(editData), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
};

import { Persona } from '../model/Persona';
import { withId } from '../model/UUID';
import api from './Api';

const PERSONAS_URL = '/personas';

export const listarPersonas = async () => {
    const response = await api.get<withId<Persona>[]>(PERSONAS_URL);
    return response;
};

export const buscarPersona = async (idPersona: string) => {
    const response = await api.get<withId<Persona>>(`${PERSONAS_URL}/${idPersona}`);
    return response;
};

export const buscarPersonaByDni = async (dni: string) => {
    const response = await api.get<withId<Persona>>(`${PERSONAS_URL}/?dni=${dni}`);
    return response;
};

export const editarPersona = async (id: string, personaEditData: Partial<Persona>) => {
    console.log(personaEditData);
    const response = await api.put(`${PERSONAS_URL}/${id}`, JSON.stringify(personaEditData), {
        headers: {
            'Content-type': 'application/json'
        }
    });
    return response;
};

export const crearPersona = async (persona: Persona) => {
    const response = await api.post(`${PERSONAS_URL}`, persona, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
};

export const borrarPersona = async (id: string) => {
    const response = await api.delete(`${PERSONAS_URL}/${id}`);
    return response;
};

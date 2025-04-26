export interface Persona {
    nombre: string;
    apellido: string;
    dni: string;
    fechaDeNacimiento: string;
    genero: string;
    esDonante: boolean;
    autos: string[];
}

export type PersonaListing = {
    nombre: string;
    apellido: string;
    dni: string;
};

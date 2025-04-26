export const formatFecha = (fecha: string) => {
    const date = new Date(fecha);
    const dia = date.getUTCDate().toString().padStart(2, '0');
    const mes = date.getUTCMonth().toString().padStart(2, '0');
    const anio = date.getUTCFullYear().toString();
    return `${dia}-${mes}-${anio}`;
};

export const formatFechaEdit = (fecha: string) => {
    const date = new Date(fecha);
    const dia = date.getUTCDate().toString().padStart(2, '0');
    const mes = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const anio = date.getUTCFullYear().toString();
    return `${anio}-${mes}-${dia}`;
};

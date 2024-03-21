export interface Product {
    id: number,
    EAN: number,
    titulo: string,
    fechaPublicacion: number,
    descripcion: string,
    editorial: string,
    autoria: string[],
    ilustracion: string[],
    participantesMin: number,
    participantesMax: number,
    duracionMinutos: number,
    edadMin: number,
    categoria: string[],
    url: string,
    // medidasCajaCm: string,
    // pesoGr: number,

}
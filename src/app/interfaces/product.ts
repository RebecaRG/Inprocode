export interface Product {
    // EAN: number,
    id_juego?: number,
    titulo: string,
    fecha_publicacion: number,
    // descripcion: string,
    editorial: string,
    autoria: string[],
    ilustracion: string[],
    participantes_min: number,
    participantes_max: number,
    duracion_minutos: number,
    edad_min: number, 
    // url?: string,
    // medidasCajaCm?: string,
    // pesoGr?: number,
    // premios?: string[],

}
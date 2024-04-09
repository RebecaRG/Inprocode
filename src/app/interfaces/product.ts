export interface Product {
    id_juego?: number,
    titulo: string,
    fecha_publicacion: number,
    editorial: string,
    autoria: string[],
    ilustracion: string[],
    participantes_min: number,
    participantes_max: number,
    duracion_minutos: number,
    edad_min: number, 
}
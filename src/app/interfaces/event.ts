export interface Event {
    id?: number; 
    titulo: string;
    lugar: string;
    inicio: Date | string; 
    fin: Date | string;
    descripcion?: string;
}
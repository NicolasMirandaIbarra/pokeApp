import { Stats } from "./Stats";

export class Pokemon {
    orden: number;
    nombre: string;
    tipo1: string;
    tipo2?: string;
    sprite: string;
    alto: number;
    peso: number;
    habilidades: string[];
    habilidadOculta: string;
    stats: Stats[];
}
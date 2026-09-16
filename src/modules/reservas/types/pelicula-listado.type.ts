export type PeliculaListado = {
  id: number;
  titulo: string;
  sinopsis: string;
  duracionMinutos: number;
  fechaEstreno: string;
  activo: boolean;
  imagenes: string[];
};
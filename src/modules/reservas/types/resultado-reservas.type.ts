export type DetalleAsientoReserva = {
  filaAsiento: string;
  numeroAsiento: number;
};

export type ReservaListado = {
  cliente: string;
  fechaReserva: Date;
  codigoReserva: string;
  estado: string;
  detalleAsiento: DetalleAsientoReserva[];
};
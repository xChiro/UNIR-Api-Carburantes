export type StationRaw = Record<string, string | undefined | null>;

export interface Station {
  id: string; // IDEESS
  rotulo?: string;
  direccion?: string;
  localidad?: string;
  provincia?: string;
  cp?: string;
  lat: number;
  lon: number;
  horario?: string;
  margen?: string;
  tipoVenta?: string;
  precios: Record<string, number | null>;
}


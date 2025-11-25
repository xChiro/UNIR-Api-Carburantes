type Props = {
  coords?: { lat: number; lon: number } | null
  geoError?: string | null
}

export default function CoordinatesDisplay({ coords, geoError }: Props) {
  return (
    <div style={{ marginBottom: 12 }}>
      <strong>Coordenadas:</strong>{' '}
      {coords ? `${coords.lat.toFixed(6)}, ${coords.lon.toFixed(6)}` : 'No disponibles'}
      {geoError && <div style={{ color: 'red' }}>Geolocalización: {geoError}</div>}
    </div>
  )
}

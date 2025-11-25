type Props = {
  setCoords?: (updater: (c?: { lat: number; lon: number } | null) => { lat: number; lon: number }) => void
}

export default function ActionsPanel({ setCoords }: Props) {
  return (
    <div style={{ width: 320 }}>
      <h2>Acciones</h2>
      <div>
        <p>Puedes introducir coordenadas manualmente:</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <input placeholder="lat" onChange={(e) => setCoords?.((c) => ({ lat: Number(e.target.value) || 0, lon: c?.lon ?? 0 }))} />
          <input placeholder="lon" onChange={(e) => setCoords?.((c) => ({ lat: c?.lat ?? 0, lon: Number(e.target.value) || 0 }))} />
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <p>Nota: los datos se obtienen desde el servicio del Ministerio y se cachean localmente.</p>
      </div>
    </div>
  )
}

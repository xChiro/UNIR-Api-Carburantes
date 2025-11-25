type Props = {
  geoLoading: boolean
  onRequestPosition: () => void
  onReload: (force?: boolean) => void
  limit: number
  onChangeLimit: (n: number) => void
}

export default function ControlsBarNew({ geoLoading, onRequestPosition, onReload, limit, onChangeLimit }: Props) {
  return (
    <div style={{ marginBottom: 12 }}>
      <button onClick={() => onRequestPosition()} disabled={geoLoading}>
        {geoLoading ? 'Obteniendo posición...' : 'Usar mi ubicación'}
      </button>
      <button onClick={() => onReload(true)} style={{ marginLeft: 8 }}>
        Forzar refresco
      </button>
      <label style={{ marginLeft: 12 }}>
        Resultados:
        <select value={limit} onChange={(e) => onChangeLimit(Number(e.target.value))} style={{ marginLeft: 6 }}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </label>
    </div>
  )
}


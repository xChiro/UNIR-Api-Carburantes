function priceToString(v: number | null | undefined) {
  if (v == null) return '-'
  // show with comma decimal and 3 decimals like the source
  return `${v.toFixed(3).replace('.', ',')} €`
}

export default function StationList({ stations }: { stations: any[] }) {
  if (!stations || stations.length === 0) return <div>No hay estaciones en el radio seleccionado.</div>

  return (
    <ul>
      {stations.map((s: any) => (
        <li key={s.id} style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600 }}>{s.rotulo ?? s.direccion ?? s.id}</div>
          <div style={{ fontSize: 12, color: '#444' }}>{s.direccion ?? ''} — {s.localidad ?? ''} ({s.provincia ?? ''})</div>
          <div style={{ fontSize: 12, color: '#666' }}>Distancia: {(s.distanceMeters / 1000).toFixed(2)} km</div>
          <div style={{ marginTop: 6 }}>
            <span style={{ marginRight: 12 }}>95 E5: {priceToString(s.precios?.['Gasolina 95 E5'])}</span>
            <span style={{ marginRight: 12 }}>Gasóleo A: {priceToString(s.precios?.['Gasoleo A'])}</span>
            <span>Gasóleo B: {priceToString(s.precios?.['Gasoleo B'])}</span>
          </div>
          <div style={{ fontSize: 12, color: '#999', marginTop: 6 }}>{s.horario ?? ''}</div>
        </li>
      ))}
    </ul>
  )
}

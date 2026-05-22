import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import type { LatLngExpression } from "leaflet";

// Fix iconos en Vite
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Mapa() {
  const coordenadas: LatLngExpression = [38.91415744151508, -6.33851675923832]; 

  return (
    <MapContainer center={coordenadas} zoom={13} className="map_container">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={coordenadas}>
        <Popup>Aquí está la ubicación 📍</Popup>
      </Marker>
    </MapContainer>
  );
}
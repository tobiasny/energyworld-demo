import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/use-app-store";
import "leaflet/dist/leaflet.css";

const statusColors: Record<string, string> = {
  producing: "#22c55e",
  "shut down": "#ef4444",
  "under development": "#f59e0b",
};

export function FieldMap() {
  const fields = useAppStore((s) => s.fields);
  const navigate = useNavigate();

  return (
    <MapContainer
      center={[62, 4]}
      zoom={5}
      className="h-full w-full rounded-lg [&_.leaflet-tile-pane]:grayscale [&_.leaflet-tile-pane]:invert [&_.leaflet-tile-pane]:brightness-[0.6] [&_.leaflet-tile-pane]:contrast-[3]"
      style={{ minHeight: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {fields.map((field) => (
        <CircleMarker
          key={field.id}
          center={[field.latitude, field.longitude]}
          radius={7}
          pathOptions={{
            color: statusColors[field.status],
            fillColor: statusColors[field.status],
            fillOpacity: 0.8,
            weight: 1,
          }}
          eventHandlers={{
            click: () => navigate(`/field/${field.id}`),
          }}
        >
          <Tooltip>
            <strong>{field.name}</strong>
            <br />
            {field.operator} &middot; {field.status}
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

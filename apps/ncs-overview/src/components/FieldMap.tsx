import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/use-app-store";
import { MapKPIs } from "./MapKPIs";
import type { Field } from "@/types";
import "leaflet/dist/leaflet.css";

const statusColors: Record<string, string> = {
  producing: "#22c55e",
  "shut down": "#ef4444",
  "under development": "#f59e0b",
};

export function FieldMap() {
  const fields = useAppStore((s) => s.fields);
  const navigate = useNavigate();
  const [hoveredField, setHoveredField] = useState<Field | null>(null);

  return (
    <div className="relative h-full w-full">
      <MapKPIs hoveredField={hoveredField} />
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
            radius={hoveredField?.id === field.id ? 10 : 7}
            pathOptions={{
              color: statusColors[field.status],
              fillColor: statusColors[field.status],
              fillOpacity: 0.8,
              weight: hoveredField?.id === field.id ? 2 : 1,
            }}
            eventHandlers={{
              click: () => navigate(`/field/${field.id}`),
              mouseover: () => setHoveredField(field),
              mouseout: () => setHoveredField(null),
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
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  CATEGORY_META,
  GRADE_META,
  MAP_CENTER,
  MAP_ZOOM,
  type MapPoint,
} from "@/lib/mapData";

function markerHtml(point: MapPoint): { html: string; size: number } {
  if (point.kind === "trail") {
    const color = GRADE_META[point.grade].color;
    if (!point.competition) {
      // Small, subtle dot for trails that aren't part of the competition.
      return {
        size: 14,
        html: `<span style="display:block;width:14px;height:14px;border-radius:9999px;background:${color};opacity:0.55;border:1px solid rgba(255,255,255,0.6)"></span>`,
      };
    }
    return {
      size: 30,
      html: `<span style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9999px;background:${color};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.4);font-size:15px;line-height:1">🏁</span>`,
    };
  }
  const meta = CATEGORY_META[point.category];
  return {
    size: 30,
    html: `<span style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9999px;background:${meta.color};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.4);font-size:15px;line-height:1">${meta.emoji}</span>`,
  };
}

function makeIcon(point: MapPoint, selected: boolean): L.DivIcon {
  const { html, size } = markerHtml(point);
  const scale = selected ? 1.35 : 1;
  const s = Math.round(size * scale);
  return L.divIcon({
    html: `<div style="transform:scale(${scale});transform-origin:center">${html}</div>`,
    className: "tvs-map-marker",
    iconSize: [s, s],
    iconAnchor: [s / 2, s / 2],
    popupAnchor: [0, -s / 2],
  });
}

function subtitle(point: MapPoint): string {
  if (point.kind === "trail") {
    return `${GRADE_META[point.grade].label} trail${
      point.competition ? " · Timed segment" : " · Not raced"
    }`;
  }
  return CATEGORY_META[point.category].label;
}

// Pans/zooms the map when the selected point changes.
function FlyToSelected({
  point,
}: {
  point: MapPoint | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (point) {
      map.flyTo(point.coords, Math.max(map.getZoom(), 15), { duration: 0.6 });
    }
  }, [point, map]);
  return null;
}

function SelectableMarker({
  point,
  selected,
  onSelect,
}: {
  point: MapPoint;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (selected) markerRef.current?.openPopup();
  }, [selected]);

  return (
    <Marker
      ref={markerRef}
      position={point.coords}
      icon={makeIcon(point, selected)}
      zIndexOffset={selected ? 1000 : 0}
      eventHandlers={{ click: () => onSelect(point.id) }}
    >
      <Popup>
        <div className="min-w-[160px]">
          <p className="text-sm font-semibold text-neutral-900">{point.name}</p>
          <p className="mt-0.5 text-xs font-medium text-neutral-500">
            {subtitle(point)}
          </p>
          <p className="mt-1.5 text-xs text-neutral-700">{point.description}</p>
          {point.approx && (
            <p className="mt-1.5 text-[11px] italic text-amber-600">
              Location approximate — to be confirmed.
            </p>
          )}
        </div>
      </Popup>
    </Marker>
  );
}

export type Basemap = "street" | "satellite";

export default function LeafletMap({
  points,
  selectedId,
  onSelect,
  basemap = "street",
}: {
  points: MapPoint[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  basemap?: Basemap;
}) {
  const selectedPoint = points.find((p) => p.id === selectedId) ?? null;

  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      scrollWheelZoom
      zoomControl={false}
      className="h-full w-full"
    >
      <ZoomControl position="bottomright" />
      {basemap === "satellite" ? (
        <>
          <TileLayer
            attribution='Imagery &copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxZoom={19}
          />
          {/* Place/road labels on top of the imagery for readability. */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
            maxZoom={19}
          />
        </>
      ) : (
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      )}
      {points.map((point) => (
        <SelectableMarker
          key={point.id}
          point={point}
          selected={point.id === selectedId}
          onSelect={onSelect}
        />
      ))}
      <FlyToSelected point={selectedPoint} />
    </MapContainer>
  );
}

import PageHeader from "@/components/PageHeader";
import MapExplorer from "@/components/map/MapExplorer";
import { VENUE_ZONES } from "@/lib/event";

export const metadata = { title: "Maps" };

export default function MapsPage() {
  return (
    <>
      <PageHeader
        title="Maps"
        intro="Marked spots at Glentress. Tap a pin or a list item to see the detail. The rest of the trails get added after the next visit."
      />
      <div className="container-tvs py-12">
        <MapExplorer />

        <p className="mt-12 text-xs text-sand/50">
          Zones on site: {VENUE_ZONES.map((z) => z.name).join(" · ")}
        </p>
      </div>
    </>
  );
}

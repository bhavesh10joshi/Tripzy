import { useEffect, useRef } from "react";


interface LocationPoint {
  lat: number;
  lng: number;
  name: string;
}

interface ItineraryMapProps {
  points: LocationPoint[];
}

export function ItineraryMap({ points }: ItineraryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (!mapRef.current || points.length === 0) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: points[0].lat, lng: points[0].lng },
        zoom: 12,
        disableDefaultUI: true,
        zoomControl: true,
      });
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
        map: mapInstanceRef.current,
        suppressMarkers: false,
      });
    }

    if (points.length >= 2 && directionsRendererRef.current) {
      const directionsService = new window.google.maps.DirectionsService();
      
      const origin = new window.google.maps.LatLng(points[0].lat, points[0].lng);
      const destination = new window.google.maps.LatLng(points[points.length - 1].lat, points[points.length - 1].lng);
      
      const waypoints = points.slice(1, -1).map(p => ({
        location: new window.google.maps.LatLng(p.lat, p.lng),
        stopover: true
      }));

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          waypoints: waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK && result) {
            directionsRendererRef.current?.setDirections(result);
          }
        }
      );
    }
  }, [points]);

  return (
    <div className="w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
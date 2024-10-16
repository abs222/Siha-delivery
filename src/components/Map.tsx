import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Order {
  id: string;
  pickupLocation: string;
  deliveryLocation: string;
  pickupCoordinates: [number, number];
  deliveryCoordinates: [number, number];
}

interface MapProps {
  orders: Order[];
}

const Map: React.FC<MapProps> = ({ orders }) => {
  const [viewport, setViewport] = React.useState({
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 10
  });

  React.useEffect(() => {
    if (orders.length > 0) {
      const firstOrder = orders[0];
      setViewport({
        latitude: firstOrder.pickupCoordinates[0],
        longitude: firstOrder.pickupCoordinates[1],
        zoom: 10
      });
    }
  }, [orders]);

  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  if (!mapboxToken) {
    console.error('Mapbox token is missing. Please check your .env file.');
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline"> Mapbox token is missing. Please check the configuration.</span>
    </div>;
  }

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="400px"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onMove={evt => setViewport(evt.viewState)}
      mapboxAccessToken={mapboxToken}
    >
      {orders.map((order) => (
        <React.Fragment key={order.id}>
          <Marker latitude={order.pickupCoordinates[0]} longitude={order.pickupCoordinates[1]}>
            <MapPin className="text-blue-600" />
          </Marker>
          <Marker latitude={order.deliveryCoordinates[0]} longitude={order.deliveryCoordinates[1]}>
            <MapPin className="text-green-600" />
          </Marker>
        </React.Fragment>
      ))}
    </ReactMapGL>
  );
};

export default Map;
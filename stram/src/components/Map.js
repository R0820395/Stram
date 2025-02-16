import React from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { decode } from '@mapbox/polyline';

// In your Map component
const Map = ({ activities }) => {

	console.log(activities)

	return (
		<MapContainer center={[0, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			{activities.map((activity) => {
				if (activity.map && activity.map.summary_polyline) {
					const decodedPolyline = decode(activity.map.summary_polyline);
					return (
						<Polyline
							key={activity.id}
							positions={decodedPolyline}
							color="red"
						/>
					);
				}
				return null;
			})}
		</MapContainer>
	);
};

/* Helper function to decode polyline
function decodePolyline(encoded) {
	// Implement polyline decoding logic here
	// You can find implementations online or use a library like @mapbox/polyline
}*/

export default Map;

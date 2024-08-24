// server/mapcontainer.js

import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

export function MapContainer(props) {
    const [infoWindowOpen, setInfoWindowOpen] = React.useState(false);

    const arrvals = props.coords.split(',');
    const center = { lat: parseFloat(arrvals[0]), lng: parseFloat(arrvals[1]) };

    const onMarkerClick = () => {
        setInfoWindowOpen(true);
    };

    const onInfoWindowClose = () => {
        setInfoWindowOpen(false);
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyAgeAFyZkt7F8cr8cPLBKbBOIJMaeOYvCo">
            <GoogleMap
                mapContainerStyle={props.styles}
                center={center}
                zoom={15}
            >
                <Marker
                    position={center}
                    onClick={onMarkerClick}
                />

                {infoWindowOpen && (
                    <InfoWindow
                        position={center}
                        onCloseClick={onInfoWindowClose}
                    >
                        <div>
                            <h1>Some Hospital Name</h1>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
}

export default MapContainer;
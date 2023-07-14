import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const TunisiaMap = () => {
  return (
   
    <MapContainer center={[34.0, 9.0]}  zoom={7} style={{ height: "300px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      
      {/* Marqueurs pour les lieux */}
      <Marker position={[36.8, 10.2]}>
        <Popup>
          Lieu 1
        </Popup>
      </Marker>
      
      <Marker position={[33.9, 8.1]}>
        <Popup>
          Lieu 2
        </Popup>
      </Marker>
      
      {/* Ajoutez d'autres marqueurs pour les autres lieux */}
    </MapContainer>
  );
};

export default TunisiaMap;

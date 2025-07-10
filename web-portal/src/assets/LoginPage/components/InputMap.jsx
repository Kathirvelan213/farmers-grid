import {MapContainer,TileLayer,useMap,Marker,Popup} from 'react-leaflet';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import { useEffect } from 'react';
import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet/dist/leaflet.css';
import { useMapEvents } from 'react-leaflet';

function SearchControl({isVisible}){
    const map=useMap();
    useEffect(() => {
        if(isVisible){
            setTimeout(() => {
                map.invalidateSize();
            }, 300);
        }
}, [isVisible]);
    useEffect(()=>{
        const provider=new OpenStreetMapProvider();

        const searchControl=new GeoSearchControl({
            provider,
            style:'bar',
            autoComplete:true,
            showMarker:true,
            retainZoomLevel:false,
        });

        map.addControl(searchControl);

        return ()=>map.removeControl(searchControl);
    },[map]);

}
function LocationMarker({setCoordinates}){

    useMapEvents({
        click(e) {
            console.log(e.latlng);
            setCoordinates(e.latlng);
        },
    });
}
export function InputMap({coordinates,setCoordinates,isRegisterMode}){
    return(
        <div className='mapContainer'>
            <MapContainer center={[12.9716, 77.5946]} 
                zoom={13} className='map'>
                <SearchControl isVisible={isRegisterMode}/>
                <TileLayer className='mapTile' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                            noWrap={true}
                            bounds={[
                                    [-85, -180],
                                    [85, 180],
                                ]} />
                <LocationMarker setCoordinates={setCoordinates}/>
                {coordinates && (
                <Marker position={coordinates}>
                    <Popup>
                    Selected location: <br />
                    {coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)}
                    </Popup>
                </Marker>
                )}

            </MapContainer>
        </div>
    )
}
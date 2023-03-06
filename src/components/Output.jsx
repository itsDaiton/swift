import React, { useCallback, useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useSelector } from 'react-redux'
import { selectDestination, selectOrigin } from '../slices/coordsSlice'

const Output = () => {

	const origin = useSelector(selectOrigin)
	const destination = useSelector(selectDestination)

	const [map, setMap] = useState(null)
	const [markers, setMarkers] = useState([])

	const onLoad = useCallback((map) => setMap(map), [])

	useEffect(() => {
		setMarkers(current => [...current, {
			lat: origin.lat,
			lng: origin.lng
		}])
		setMarkers(current => [...current, {
			lat: destination.lat,
			lng: destination.lng
		}])
	}, [])

	
	useEffect(() => {
		if (map) {
			const bounds = new window.google.maps.LatLngBounds()
			markers.map(marker => {
				bounds.extend({
					lat: marker.lat,
					lng: marker.lng
				})
			})
			map.fitBounds(bounds)
		}
	}, [map, markers])	

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY
  })

	if (!isLoaded) {
		return <div>Loading...</div>
	}

  return (
		<div className='h-[93vh] bg-gradient'>
			<div className='flex justify-center items-center'>
				<GoogleMap
					onLoad={onLoad}
					mapContainerStyle={{
						height: '800px',
						width: '1400px',
						margin: '50px',
						borderRadius: '15px',
					}}
					center={{
						lat: 49.968,
						lng: 14.513
					}}
					zoom={10}
					key={import.meta.env.VITE_GOOGLE_API_KEY}
				>
				{markers.map((marker, index) => (
					<Marker
						key={index}
						position={{
							lat: marker.lat,
							lng: marker.lng
						}}
					/>
				))}
				</GoogleMap>
			</div>
		</div>
  )
}

export default Output

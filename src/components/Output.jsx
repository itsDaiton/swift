import React, { useCallback, useEffect, useState } from 'react'
import { DirectionsRenderer, DistanceMatrixService, GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useSelector } from 'react-redux'
import { selectDestination, selectOrigin } from '../slices/coordsSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCar, faLocation, faLocationDot, faPersonWalking, faTrain } from '@fortawesome/free-solid-svg-icons'
import { distance, motion } from 'framer-motion'
import { useNavigate } from 'react-router'

const Output = () => {

	const modes = [
		{
			value: 'Driving',
			icon: faCar	
		},
		{
			value: 'Transit',
			icon: faTrain
		},
		{
			value: 'Walking',
			icon: faPersonWalking
		},
	]

	const origin = useSelector(selectOrigin)
	const destination = useSelector(selectDestination)

	const [map, setMap] = useState(null)
	const [markers, setMarkers] = useState([])
	const [travelMode, setTravelMode] = useState('DRIVING')
	const [response, setResponse] = useState(null)
	const [distanceMatrix, setDistanceMatrix] = useState(null)

	const navigate = useNavigate()

	const onLoad = useCallback((map) => setMap(map), [])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY
  })

	const getRoute = async () => {
		const directionsService = new google.maps.DirectionsService()
		const result = await directionsService.route({
			origin: origin,
			destination: destination,
			travelMode: travelMode
		})
		setResponse(result)
	}

	const calculateMatrix = async () => {
		const distanceMatrixService = new google.maps.DistanceMatrixService()
		const result = await distanceMatrixService.getDistanceMatrix({
			destinations: [{
				lat: destination.lat, lng: destination.lng
			}],
			origins: [{
				lat: origin.lat, lng: origin.lng
			}],
			travelMode: travelMode
		})
		setDistanceMatrix(result)
	}

	const handleSwitch = (e) => {
		setTravelMode(e.target.value)
	}

  const handleNavigate = () => {
    navigate('/')
  }

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

	useEffect(() => {
		getRoute()
		calculateMatrix()
	}, [origin, destination, travelMode])

	if (!isLoaded) {
		return <div>Loading...</div>
	}

	console.log(distanceMatrix)

  return (
		<div className='bg-gradient'>
			<div className='flex justify-center items-center space-x-[50px] py-[40px]'>
				<div className='flex justify-center items-center space-x-[70px]'>
					<div className={`relative flex items-center pt-1 text-white`}>
						<FontAwesomeIcon icon={faLocationDot} className='text-[28px] absolute ml-5 pointer-events-none z-10'/>
						<div
							className='text-[28px] h-[80px] outline-none border-none glassmorphism font-poppins text-semibold
							pl-[60px] pr-10 placeholder-current flex justify-center items-center'
						>
							{origin.name}
						</div>
					</div>
				</div>
				<div className='flex justify-center items-center'>
					<FontAwesomeIcon icon={faArrowRight} className='text-[48px] z-10 text-white'/>
				</div>
				<div className='flex justify-center items-center space-x-[70px]'>
					<div className={`relative flex items-center pt-1 text-white`}>
						<FontAwesomeIcon icon={faLocation} className='text-[28px] absolute ml-5 pointer-events-none z-10'/>
						<div
							className='text-[28px] h-[80px] outline-none border-none glassmorphism font-poppins text-semibold
							pl-[60px] pr-10 placeholder-current flex justify-center items-center'
						>
							{destination.name}
						</div>
					</div>
				</div>
			</div>
			<div className='flex justify-center items-center'>
				{modes.map((mode, index) => (
				<motion.label
					key={index}
					htmlFor={mode.value.toUpperCase()} 
					className={`text-white font-poppins text-[18px]  cursor-pointer
					flex justify-center items-center flex-col my-5 px-10 pb-2 space-y-2 mx-2 
					${mode.value.toUpperCase() === travelMode ? 'glass-radio-active' : ''}`}
					whileHover={{
						scale: 1.05
					}}
					whileTap={{
						scale: 0.95
					}} 
				>
					<input 
						key={index}
						type='radio' 
						id={mode.value.toUpperCase()}
						name='travelMode'
						value={mode.value.toUpperCase()}
						checked={travelMode === mode.value.toUpperCase()}
						onChange={handleSwitch}
						className='invisible opacity-0'
					/>
					<FontAwesomeIcon icon={mode.icon} className='text-[28px]'/>
					<span>
						{mode.value}				
					</span>
				</motion.label>		
				))}
			</div>
			<div className='flex justify-center items-center'>
				<GoogleMap
					onLoad={onLoad}
					mapContainerStyle={{
						height: '600px',
						width: '1000px',
						borderRadius: '15px',
						boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
					}}
					center={{
						lat: 49.968,
						lng: 14.513
					}}
					zoom={10}
					key={import.meta.env.VITE_GOOGLE_API_KEY}
					options={{
						streetViewControl: false,
						mapTypeControl: false,
						fullscreenControl: false
					}}
				>
				{response !== null && 
				<DirectionsRenderer
					options={{
						directions: response
					}}
				/>
				}
				</GoogleMap>
			</div>
			{distanceMatrix &&
			<div className='flex justify-center items-center flex-col text-white font-poppins text-[20px]'>
				<p>Trip distance: {distanceMatrix.rows[0].elements[0].distance.text}</p>
				<p>Trip duration: {distanceMatrix.rows[0].elements[0].duration.text}</p>
			</div>
			}
		</div>
  )
}

export default Output

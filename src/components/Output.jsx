import React, { useCallback, useEffect, useState } from 'react'
import { DirectionsRenderer, GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCar, faClock, faLocation, faLocationDot, faPersonWalking, faRoad, faTrain } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import ReactGoogleAutocomplete from 'react-google-autocomplete'

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
  
  const [origin, setOrigin] = useState()
  const [destination, setDestination] = useState()

	const [map, setMap] = useState(null)
	const [travelMode, setTravelMode] = useState('DRIVING')
	const [response, setResponse] = useState(null)
	const [distanceMatrix, setDistanceMatrix] = useState(null)

  const [libraries] = useState(['places'])

	const navigate = useNavigate()

	const onLoad = useCallback((map) => setMap(map), [])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries
  })

	const getRoute = async () => {
    setResponse(null)
    if (origin && destination) {
      const directionsService = new google.maps.DirectionsService()
      const result = await directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: travelMode
      })
      setResponse(result)
    }
	}

	const calculateMatrix = async () => {
    if (origin && destination) {
      const distanceMatrixService = new google.maps.DistanceMatrixService()
      const result = await distanceMatrixService.getDistanceMatrix({
        destinations: [{
          lat: destination.lat, lng: destination.lng
        }],
        origins: [{
          lat: origin.lat, lng: origin.lng
        }],
        travelMode: travelMode,
        language: 'en'
      })
      setDistanceMatrix(result)
    }
	}

	const handleSwitch = (e) => {
		setTravelMode(e.target.value)
	}

  const handleNavigate = () => {
    navigate('/')
  }

	useEffect(() => {
		getRoute()
		calculateMatrix()
	}, [origin, destination, travelMode])

	if (!isLoaded) {
		return <div>Loading...</div>
	}

  return (
		<div className='bg-gradient'>
      <div className='flex justify-center items-center space-x-[50px] pt-5'>
        <div className={`relative flex items-center pt-1 text-white`}>
          <FontAwesomeIcon icon={faLocationDot} className='text-[24px] absolute ml-5 pointer-events-none z-10'/>
          <ReactGoogleAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
            onPlaceSelected={(place) => setOrigin({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              name: place.formatted_address        
            })}
            placeholder='Where from?'
            className='text-[22px] h-[70px] outline-none border-none glassmorphism font-poppins text-semibold
            pl-[60px] pr-10 placeholder-current'
          />
        </div>
        <div className='flex justify-center items-center'>
          <FontAwesomeIcon icon={faArrowRight} className='text-[36px] text-white'/>
        </div>
        <div className={`relative flex items-center pt-1 text-white`}>
          <FontAwesomeIcon icon={faLocation} className='text-[24px] absolute ml-5 pointer-events-none z-10'/>
          <ReactGoogleAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
            onPlaceSelected={(place) => setDestination({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              name: place.formatted_address              
            })}
            placeholder='Where to?'
            className='text-[22px] h-[70px] outline-none border-none glassmorphism font-poppins text-semibold
            pl-[60px] pr-10 placeholder-current'
          />
        </div>
      </div>
			<div className='flex justify-center items-center'>
				{modes.map((mode, index) => (
				<motion.label
					key={index}
					htmlFor={mode.value.toUpperCase()} 
					className={`text-white font-poppins text-[16px]  cursor-pointer
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
					<FontAwesomeIcon icon={mode.icon} className='text-[20px]'/>
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
						height: '550px',
						width: '1000px',
						borderRadius: '15px',
						boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
					}}
          center={{
            lat: origin ? origin.lat : 50.075,
            lng: origin ? origin.lng : 14.436
          }}
					zoom={11}
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
			<div className='flex justify-center items-center flex-col text-white font-poppins text-[20px] font-semibold'>
        {distanceMatrix.rows[0].elements[0].status === 'ZERO_RESULTS' ?
        <p>No results.</p>
        :
        <div className='flex flex-col justify-center items-center glassmorphism py-5 px-5 mt-5 w-1/6'>
          <div className='flex flex-row items-center space-x-2'>
            <FontAwesomeIcon icon={faRoad}/>
            <p>{distanceMatrix.rows[0].elements[0].distance.text}</p>
          </div>
          <div className='flex flex-row items-center space-x-2'>
            <FontAwesomeIcon icon={faClock}/>
            <p>{distanceMatrix.rows[0].elements[0].duration.text}</p>  
          </div> 
        </div>  
        }
			</div>
      }
      <div className='flex justify-center items-center flex-col text-[20px] py-10'>
        <motion.button
          type='button'
          className='glassmorphism text-[28px] text-white w-[10%] h-[70px] rounded-full shadow-xl font-poppins'
          whileHover={{
            scale: 1.1
          }}
          whileTap={{
            scale: 0.9
          }}
          onClick={handleNavigate}
        >
          Back
        </motion.button>
      </div>
		</div>
  )
}

export default Output

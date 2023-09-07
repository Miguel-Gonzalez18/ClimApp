import { useEffect, useState } from 'react'
//Estilos
import '../assets/styles/dataclima.css'
// Importar componente de animacion
import LottieAnimation from './LottieAnimation'
//componente Spinner
import Loading from './Loading'
//importamos el hoooks de clima
import useClima from '../hooks/useClima'

function DataClima() {
    const { resultadoClima, formatearFecha, msToKmh, busqueda, setBusqueda, consultarClima, cargando} = useClima()
    const [icon, setIcon] = useState('')
    const [weatherDescription, setWeatherDescription] = useState('')
    const [unidadClass, setUnidadClass] = useState('metric')
    const { name, main, weather, wind } = resultadoClima
    
    useEffect(()=>{
        if (weather){
            const urlIcono = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
            setIcon(urlIcono)
            setWeatherDescription(weather[0].description)
            return
        }
    },[weather])

    const fechaFormateada = formatearFecha();
    
    function unit(unidad){
        setBusqueda({...busqueda, ['units']: unidad})
        consultarClima(busqueda)
        setUnidadClass(unidad)
    }

    return resultadoClima?.name ? (
        <div className='contenidoClima'>
            
            {cargando ? (<Loading/>) : (
                <>
                    <h1 className='texto-alternativo'>{name}</h1>
            
                    <div className="tem_Principal">
                        <p>
                            {parseInt(main.temp)} 
                            <span className={unidadClass === 'metric' ? 'activo' : '' } onClick={()=> unit('metric')}>°C | </span>
                            <span className={unidadClass === 'imperial' ? 'activo' : '' } onClick={()=> unit('imperial')}>°F</span>
                        </p>
                        <img src={icon} alt="logoStadoClima" />
                    </div>

                    <div className="otrosDatos">
                        <p className="fecha">{fechaFormateada}</p>
                        <p className='weather-description'>{weatherDescription}</p>
                        <p>Temperatura maxima: {parseInt(main.temp_max)} {unidadClass === 'metric' ? '°C' : '°F'}</p>
                        <p>Temperatura minima: {parseInt(main.temp_min)} {unidadClass === 'metric' ? '°C' : '°F'}</p>
                        <p>Humedad: {main.humidity}%</p>
                        <p>Viento: a {msToKmh(parseInt(wind.speed))} km/h</p>
                    </div>
                </>
            )}
            
        </div>
    ) : (
        <div className='contenidoClima'>
            <LottieAnimation />
            <p className='texto-alternativo'>Hola!!. Escribe una ciudad y selecciona un país para consultar sus datos meteorológicos</p>
        </div>
    )
}

export default DataClima
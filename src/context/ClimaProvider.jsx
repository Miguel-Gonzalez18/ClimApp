import { useState, createContext } from "react";

const ClimaContext = createContext()

const ClimaProvider = ({children}) => {
    const [cargando, setCargando] = useState(false)
    const [alerta, setAlerta] = useState({
        'message': '',
        'type': ''
    })

    const [busqueda, setBusqueda] = useState({
        ciudad: '',
        pais: '',
        units: 'metric'
    })
    const [resultadoClima, setResultadoClima] = useState({})

    const datosBusqueda = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    function formatearFecha() {
        const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
        const fecha = new Date();
        
        const diaSemana = diasSemana[fecha.getDay()]; // Obtiene el día de la semana
        const hora = fecha.getHours(); // Obtiene la hora
        const minutos = fecha.getMinutes(); // Obtiene los minutos
    
        // Formatea la hora para que tenga un cero inicial si es menor a 10
        const horaFormateada = hora < 10 ? `0${hora}` : hora;
    
        // Formatea los minutos para que tenga un cero inicial si es menor a 10
        const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;
    
        const fechaFormateada = `${diaSemana}, ${horaFormateada}:${minutosFormateados}`;
    
        return fechaFormateada;
    }

    function msToKmh(velocidadMs) {
        // Convierte de m/s a Km/h utilizando la fórmula
        const velocidadKmh = (velocidadMs * 3600) / 1000;
        return velocidadKmh;
    }
    

    const consultarClima = async datos =>{
        setCargando(true)
        setAlerta({
            'message': '',
            'type': ''
        })
        try {
            const { ciudad, pais, units } = datos
            const url1 = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${import.meta.env.VITE_API_KEY}`
            const respuesta1 = await fetch(url1)
            const resultado1 = await respuesta1.json()
            const { lat, lon } = resultado1[0]

            const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=${units}&lang=es`
            const respuesta2 = await fetch(url2)
            const clima = await respuesta2.json()
            setResultadoClima(clima)
            setCargando(false)
        } catch (error) {
            console.log(error)
            setAlerta({...alerta, ['message']: "🤔Al parecer no hubo resultados. Asegúrate de que la ciudad y el país coincidan, además que esté bien escrito. Vuelve a intentarlo", ['type']: 'warning'})
        }
    }

    return(
        <ClimaContext.Provider value={{busqueda, datosBusqueda, consultarClima, resultadoClima, formatearFecha, msToKmh, setBusqueda, cargando, alerta, setAlerta}}>
            {children}
        </ClimaContext.Provider>
    )
}

export {
    ClimaProvider
}

export default ClimaContext
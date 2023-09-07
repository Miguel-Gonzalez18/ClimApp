//Estilos
import '../assets/styles/formulario.css'
//Recursos
import weatherIcon from '../assets/img/weatherIcon.png'
//hooks
import useClima from '../hooks/useClima'
import { useState } from 'react'

function Formulario() {
    const [alerta, setAlerta] = useState('')
    const {busqueda, datosBusqueda, consultarClima} = useClima()
    const {ciudad, pais} = busqueda

    const handleSubmit = e => {
        e.preventDefault()

        if(Object.values(busqueda).includes('')){
            setAlerta("Todos los datos son obligatorios")
            return
        }
        setAlerta('')
        consultarClima(busqueda)
    }

    return (
        <form action="#" onSubmit={handleSubmit}>
            {alerta && <p className='alerta'>{alerta}</p>}
            <div className="formulario">
                <img src={weatherIcon} alt="Logo Loweather" />
                <div className="campo">
                    <label htmlFor="#pais">Ciudad</label>
                    <input type="text" name="ciudad" id="ciudad" onChange={datosBusqueda} value={ciudad} />
                </div>

                <div className="campo">
                    <label htmlFor="pais">País</label>
                    <select name="pais" id="pais" onChange={datosBusqueda} value={pais}>
                        <option value="">--Seleccione un País--</option>
                        <option value="US">Estados Unidos</option>
                        <option value="MX">México</option>
                        <option value="AR">Argentina</option>
                        <option value="CO">Colombia</option>
                        <option value="CR">Costa Rica</option>
                        <option value="ES">España</option>
                        <option value="PE">Perú</option>
                        <option value="DO">República Dominicana</option>
                    </select>
                </div>

                <input type="submit" value="Consultar Clima" />
            </div>
        </form>
    )
}

export default Formulario
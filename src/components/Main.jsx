//Estilos
import '../assets/styles/app.css'
//Componentes
import Formulario from './Formulario'
import DataClima from './DataClima'

function Main() {
    return (
        <main className='containerMain contenido'>
            <Formulario />
            <DataClima />
        </main>
    )
}

export default Main
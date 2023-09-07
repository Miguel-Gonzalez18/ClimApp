//Recursos
import logo from '../assets/img/logo.png'
import logoGitHub from '../assets/img/github.png'
//estilos
import '../assets/styles/header.css'

function Header() {
    return (
        <header className='header'>
            <div className="logo">
                <img src={logo} alt="logo de la palicación" />
                <h1>ClimApp</h1>
            </div>
            <a className='logoA' href="#" target="_blank" rel="noopener noreferrer">
                <img src={logoGitHub} alt="Logo GitHub" />
            </a>
        </header>
    )
}

export default Header
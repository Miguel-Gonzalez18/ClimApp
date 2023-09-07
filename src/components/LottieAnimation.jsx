// Importa las dependencias necesarias de React y Lottie
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from '../assets/img/solAnimation.json'; // Reemplaza 'ruta-del-archivo' con la ubicación del archivo JSON descargado

// Define el componente LottieAnimation
const LottieAnimation = () => {
    // Crea una referencia a un elemento DOM que se utilizará para mostrar la animación
    const containerRef = useRef(null);

    // Utiliza el hook useEffect para cargar la animación cuando el componente se monta
    useEffect(() => {
        // Carga la animación utilizando la biblioteca Lottie
        const anim = lottie.loadAnimation({
            container: containerRef.current, // El contenedor HTML donde se mostrará la animación
            animationData: animationData, // Los datos de animación importados desde un archivo JSON
            loop: true, // Puedes configurar aquí si quieres que la animación se repita
        });

        // Define una función de limpieza que se ejecutará cuando el componente se desmonte
        return () => {
            anim.destroy(); // Destruye la animación para liberar recursos
        };
    }, []); // El segundo argumento vacío [] indica que esta función se ejecuta solo una vez, cuando se monta el componente

    // Renderiza un div que actúa como el contenedor de la animación y hace referencia a containerRef
    return (
        <div ref={containerRef} style={{ width: '250px'}}></div>
    );
};

// Exporta el componente LottieAnimation para que pueda ser utilizado en otros lugares
export default LottieAnimation;

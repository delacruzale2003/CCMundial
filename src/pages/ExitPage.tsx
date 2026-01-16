import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import BackgroundCC from '../components/BackgroundCC';

interface ExitState {
    prizeName: string;
    photoUrl: string;
}

const normalizePrizeName = (name: string | null): string | null => {
    if (!name || name === "¡Gracias por participar! Contacta a la tienda para más detalles.") {
        return null;
    }
    const safeName = name.toLowerCase().replace(/\s+/g, '_');
    return `/${safeName}.png`;
};

const ExitPage = () => {
    const location = useLocation();
    const state = location.state as ExitState | null;

    const [prizeName, setPrizeName] = useState<string | null>(null);
    const [prizeImageUrl, setPrizeImageUrl] = useState<string | null>(null);

    // 1. LÓGICA DE PROTECCIÓN CONTRA REFRESCAR (beforeunload)
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            // Cancelar el evento según el estándar
            e.preventDefault();
            // Chrome requiere que returnValue sea un string vacío para mostrar la alerta
            e.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // 2. LÓGICA DE RECUPERACIÓN DE DATOS
    useEffect(() => {
        let finalPrizeName = null;
        let storedDataAvailable = false;

        if (state && state.prizeName) {
            finalPrizeName = state.prizeName;
            storedDataAvailable = true;
            localStorage.setItem("prizeName", state.prizeName);
            if (state.photoUrl) {
                localStorage.setItem("photoUrl", state.photoUrl); 
            } else {
                 localStorage.removeItem("photoUrl");
            }
        } else {
            const storedPrize = localStorage.getItem("prizeName");
            if (storedPrize) {
                finalPrizeName = storedPrize;
                storedDataAvailable = true;
            }
        }
        
        if (finalPrizeName && storedDataAvailable) {
            setPrizeName(finalPrizeName);
            setPrizeImageUrl(normalizePrizeName(finalPrizeName));
        } else {
            setPrizeName("¡Gracias por participar! Contacta a la tienda para más detalles.");
            setPrizeImageUrl(null);
        }
    }, [state]);

    return (
    // CAMBIO: Ajusté el padding a p-4 (16px) para un balance entre 10px y 25px.
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-4 overscroll-y-none">
        
        {/* BACKGROUND IMAGE */}
        <BackgroundCC />

        {/* CONTENIDO PRINCIPAL */}
        {/* CAMBIO: space-y-2 en móvil (menos hueco) y space-y-6 en escritorio */}
        <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center space-y-2 sm:space-y-6">
            
            {/* Logo Superior */}
            {/* CAMBIO: w-36 en móvil (más pequeño) -> w-60 en escritorio */}
            <img
                src="/logoballcc.png"
                alt="Logo"
                className="w-40 sm:w-60 h-auto mb-1 sm:mb-2" 
            />

            <div className="space-y-0 sm:space-y-1">
                {/* CAMBIO: Textos más pequeños en móvil (text-3xl y text-2xl) para ganar espacio */}
                <h1 className="text-white font-semibold leading-tight">
                    <span className="block mt-8 uppercase tracking-tighter font-mont-bold-italic text-4xl sm:text-6xl text-white">
                        Felicidades
                    </span>
                    <span className="block text-2xl sm:text-4xl opacity-90 font-mont-bold text-white mt-1">
                        HAS GANADO
                    </span>
                </h1>
            </div>

            {/* Bloque del Premio */}
            <div className="w-full px-2 flex flex-col items-center justify-center drop-shadow-2xl">
                
                {/* Contenedor de Imagen */}
                {/* CAMBIO: Reduje la altura mínima del contenedor en móvil */}
                <div className="w-full flex justify-center items-center min-h-[140px] sm:min-h-[224px] ">
                    {prizeImageUrl ? (
                        <img 
                            src={prizeImageUrl} 
                            alt={`Premio: ${prizeName}`} 
                            // CAMBIO IMPORTANTE: 
                            // h-36 (altura fija en móvil, aprox 144px) evita que sea gigante.
                            // sm:h-auto (en escritorio deja que crezca).
                            // max-w-[80%] asegura que no toque los bordes.
                            className="h-60 sm:h-auto w-auto max-w-[80%] sm:max-w-full object-contain drop-shadow-2xl animate-bounce-slow" 
                        />
                    ) : (
                        <div className='flex items-center justify-center text-white font-bold italic animate-pulse text-sm sm:text-base'>
                            Cargando premio...
                        </div>
                    )}
                </div>

                {/* Nombre del Premio */}
                {/* CAMBIO: Texto reducido a 2xl en móvil para nombres de premios largos */}
                <p className="text-2xl sm:text-4xl drop-shadow-2xl font-mont-extrabold text-white mt-1 sm:mt-2 px-4 leading-tight w-60">
                    {prizeName} 
                </p>
                
            </div>
        </div>
    </div>
);
};

export default ExitPage;
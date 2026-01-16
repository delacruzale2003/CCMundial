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
        // CAMBIO 1: p-[10px] para dejar exactamente 10px de margen a los lados
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-[10px] overscroll-y-none">
            
            {/* BACKGROUND IMAGE */}
            <BackgroundCC />

            {/* CONTENIDO PRINCIPAL */}
            {/* CAMBIO 2: Cambié max-w-md a max-w-lg para que sea un poco más ancho en pantallas grandes */}
            <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center space-y-4">
                
                {/* Logo Superior */}
                <img
                    src="/logoschfull.png"
                    alt="Logo"
                    className="w-48 sm:w-60 h-auto mb-2" 
                />

                <div className="space-y-1">
                    <h1 className="text-4xl sm:text-6xl text-black font-semibold leading-tight">
                        <span className="block uppercase tracking-tighter font-mont-bold-italic">Felicidades</span>
                        <span className="block text-4xl sm:text-4xl opacity-90 font-mont-bold">HAS GANADO</span>
                    </h1>
                </div>

                {/* Bloque del Premio */}
                <div className="w-full px-2 py-2 flex flex-col items-center justify-center">
                    
                    {/* Contenedor de Imagen */}
                    <div className="w-full flex justify-center items-center min-h-[180px] sm:min-h-[224px]">
                        {prizeImageUrl ? (
                            <img 
                                src={prizeImageUrl} 
                                alt={`Premio: ${prizeName}`} 
                                className="max-w-100 sm:max-w-100 object-contain drop-shadow-2xl animate-bounce-slow" 
                            />
                        ) : (
                            <div className='flex items-center justify-center text-black font-bold italic animate-pulse'>
                                Cargando premio...
                            </div>
                        )}
                    </div>

                    <p className="text-4xl sm:text-4xl font-mont-extrabold text-black mt-2 px-4 leading-tight w-full">
                        {prizeName} 
                    </p>
                    
                </div>
            </div>
        </div>
    );
};

export default ExitPage;
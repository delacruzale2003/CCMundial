import React, { useState } from "react";
import { useRegistration } from "../hooks/useRegistration";
import { Loader2, X } from 'lucide-react';
import BackgroundCC from "../components/BackgroundCC";

const RegisterPage: React.FC = () => {
    const [showTermsModal, setShowTermsModal] = useState(true);

    const {
        loading,
        compressing,
        preview,
        compressedFile,
        message,
        name,
        dni,
        phoneNumber,
        storeId,
        setName,
        setDni,
        setPhoneNumber,
        handleFileChange,
        handleSubmit,
    } = useRegistration();

    const handleCloseModal = () => {
        setShowTermsModal(false);
    };

    if (!storeId) {
        return (
            <div className="p-8 text-center text-red-700 bg-red-100 min-h-screen flex items-center justify-center font-mont-bold border-none">
                Error: ID de tienda no encontrado en la URL. Asegúrate de escanear el QR correctamente.
            </div>
        );
    }

    const isFormValid = name.trim() !== '' && phoneNumber.trim() !== '' && dni.trim() !== '' && compressedFile;
    const isDisabled = loading || compressing || !isFormValid || showTermsModal;

    return (
    // CAMBIO: min-h-[100dvh] ayuda a que se vea bien en navegadores móviles con barra de dirección dinámica
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start overflow-x-hidden border-none outline-none bg-transparent font-mont-regular">
        
        {/* 1. Fondo (Z-0) */}
        <BackgroundCC />

        {/* 2. Capa de Contenido */}
        {/* CAMBIO: pb-32 asegura que el último input no quede tapado por el botón flotante */}
        <div className={`relative z-10 w-full flex flex-col items-center p-2 pb-32 transition-all duration-500 border-none ${loading ? 'blur-md pointer-events-none' : 'blur-0'}`}>
            
            {/* Logo: w-36 para móviles pequeños (iPhone SE), w-48 para medianos, w-60 para tablet/PC */}
            <img
                src="/logoschfull.png"
                alt="Logo Schweppes"
                className="w-36 xs:w-44 sm:w-60 h-auto my-3 sm:my-5 object-contain"
            />

            {/* Contenedor del Formulario */}
            <form
    id="registrationForm"
    onSubmit={handleSubmit}
    className="bg-transparent border-2 border-black rounded-3xl p-4 sm:p-6 pt-4 w-[92%] xs:w-[90%] sm:max-w-md space-y-2 sm:space-y-3 mb-2"
>
    {/* Títulos */}
    <div className="mb-2">
        <h1 className="text-base xs:text-lg sm:text-xl text-start text-black font-mont-extrabold leading-tight">
            1. REGÍSTRATE PARA PARTICIPAR
        </h1>
        
        <h2 className="text-start font-mont-bold text-md xs:text-base sm:text-lg leading-tight tracking-tight mt-1">
            Llena tus datos y participa <br className=""/> por fabulosos premios
        </h2>
    </div>

    {message && (
        <p className="text-center text-xs font-medium p-1.5 bg-red-100 text-red-700 rounded-lg">{message}</p>
    )}

    {/* --- INPUTS --- */}

    <div>
        {/* CAMBIO: text-base (más grande) y ml-1 (más pegado al borde izquierdo) */}
        <label className="block text-black text-base sm:text-lg font-mont-bold ml-1 mb-0.5">Nombres y apellidos</label>
        <input
            type="text"
            name="name"
            required
            disabled={loading}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={45}
            className="bg-transparent border-2 border-black py-2 px-4 sm:p-3 w-full rounded-full text-black text-sm sm:text-base placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors shadow-inner disabled:opacity-50"
        />
    </div>

    <div>
        {/* CAMBIO: text-base y ml-1 */}
        <label className="block text-black text-base sm:text-lg font-mont-bold ml-1 mb-0.5">Número de DNI</label>
        <input
            type="text"
            name="dni"
            value={dni}
            disabled={loading}
            onChange={(e) => setDni(e.target.value)}
            maxLength={11}
            required
            className="bg-transparent border-2 border-black py-2 px-4 sm:p-3 w-full rounded-full text-black text-sm sm:text-base placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors shadow-inner disabled:opacity-50"
        />
    </div>

    <div>
        {/* CAMBIO: text-base y ml-1 */}
        <label className="block text-black text-base sm:text-lg font-mont-bold ml-1 mb-0.5">Teléfono</label>
        <input
            type="tel"
            name="phone_number"
            required
            disabled={loading}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            maxLength={9}
            className="bg-transparent border-2 border-black py-2 px-4 sm:p-3 w-full rounded-full text-black text-sm sm:text-base placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors shadow-inner disabled:opacity-50"
        />
    </div>

    {/* Input de Archivo */}
    <div>
        {/* CAMBIO: text-base y ml-1 */}
        <label className="block text-black text-base sm:text-lg font-mont-bold ml-1 mb-0.5">Foto de Voucher</label>
        <div className="mt-0.5">
            <input
                type="file"
                id="photo-upload"
                name="photo_url"
                accept="image/*"
                required
                disabled={loading}
                onChange={handleFileChange}
                className="hidden"
            />
            {/* Manteniendo tu configuración del botón "Seleccionar archivo" */}
            <label
                htmlFor="photo-upload"
                className={`cursor-pointer flex items-center justify-center w-full py-2 sm:py-3 px-4 rounded-full border-2 border-black text-black font-mont-extrabold text-base sm:text-xl leading-none tracking-tight uppercase transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white'}`}
            >
                    SELECCIONAR ARCHIVO
            </label>
        </div>

        {preview && (
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 border-2 border-gray-300 rounded-xl overflow-hidden mx-auto mt-3 shadow-md">
                <img src={preview} alt="preview" className="object-cover w-full h-full" />
                {compressing && (
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                        <Loader2 className="animate-spin w-6 h-6 text-white" />
                    </div>
                )}
            </div>
        )}
    </div>
</form>

            {/* BARRA FIJA INFERIOR */}
            <div className="fixed bottom-4 left-0 right-0 px-6 z-20 flex justify-center pointer-events-none">
                <button
                    type="submit"
                    form="registrationForm"
                    disabled={isDisabled}
                    // pointer-events-auto es necesario porque el padre tiene pointer-events-none
                    className="pointer-events-auto bg-black font-mont-bold rounded-full text-lg sm:text-2xl text-white py-3 w-full max-w-[250px] shadow-2xl flex items-center justify-center disabled:opacity-0 hover:scale-105 transition-transform"
                >
                    ENVIAR
                </button>
            </div>
        </div>

        {/* 3. Overlay de Carga */}
        {loading && (
            <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="bg-white/90 p-6 rounded-3xl flex flex-col items-center shadow-2xl">
                    <Loader2 className="animate-spin w-10 h-10 sm:w-16 sm:h-16 text-black mb-3" />
                    <p className="font-mont-bold text-base sm:text-xl tracking-widest text-black animate-pulse">PROCESANDO...</p>
                </div>
            </div>
        )}

            {/* 2. 💡 COMPONENTE MODAL DE TÉRMINOS Y CONDICIONES */}

        {showTermsModal && (

            <div className="fixed inset-0  backdrop-blur-xl flex items-center justify-center z-50 p-4">



                {/* Contenido del Modal */}

                <div className="bg-transparent text-black rounded-4xl p-5 sm:p-6 pt-4 w-full max-w-sm max-h-[80vh] flex flex-col relative shadow-xl border-3 border-black">



                    {/* Botón de Cerrar (X) en la esquina */}

                    <button

                        onClick={handleCloseModal}

                        className="absolute top-3 right-3 text-black hover:text-gray-800 transition-colors border border-2 rounded-full"

                        aria-label="Cerrar términos y condiciones"

                    >

                        <X size={26} />

                    </button>



                    {/* Contenido Desplazable */}

                    <div className="flex-grow overflow-y-auto text-black text-[10px] sm:text-xs space-y-3 pb-4 pt-10 pr-1 leading-snug">



                        <p className="font-mont-regular">

                            <strong className="font-mont-bold">Promoción válida del 05 de Enero al 05 de Febrero del 2026.</strong>

                            Mecanica:Participan personas naturales mayores de 18 años, con residencia legal y domicilio en el territorio nacional del Perú, que realicen la compra de <strong>Coca-Cola</strong> en las tiendas seleccionadas.

                            para participar de la promoción <strong>SCHWEPPES VERANO 2026 , deberás escanear el código QR ubicado en las

                            tiendas autorizadas, llenar los datos en el landing page, subir

                            la foto de tu boucher de compra de producto y podrás entrar

                            al sorteo por diferentes premios. El horario para ingresar a la

                            landing page sera de acuerdo a los horarios de activación en

                            cada tienda seleccionada .</strong>

                            <br /> <br />

                            <strong>Los premios son toallas , gorras , mugs ,  y

                            destapadores.

                            </strong>

                            <br />

                            Modalidad de entrega de premios: Los premios se entregarán

                            en al área de activación de la marca en la tienda a implementar , deberá mostrarse la pantalla de premio y el boucher de

                            compra al personal de activación para registrar y entregar el

                            premio .

                        </p>



                    </div>



                    {/* Botón de Continuar */}

                    



                </div>

            </div>

        )}
    </div>
);
};

export default RegisterPage;
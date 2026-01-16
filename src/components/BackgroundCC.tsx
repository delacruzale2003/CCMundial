import React from 'react';

const BackgroundCC: React.FC = () => {
  return (
    <>
      <style>
        {`
          @keyframes subtleFlow {
            0% { background-position: 0% 0%; }
            50% { background-position: 10% 5%; }
            100% { background-position: 0% 0%; }
          }
          .animate-sunset-mesh {
            background-color: #ffcf2a; 
            background-image: 
              radial-gradient(at 0% 0%, #ffcf2a 0px, transparent 40%),   
              radial-gradient(at 100% 0%, #ffcf2a 0px, transparent 60%);
            
            background-size: 110% 110%;
            animation: subtleFlow 20s ease-in-out infinite;
          }
        `}
      </style>
      
      {/* Capa 1: Fondo Animado */}
      <div className="fixed inset-0 w-full h-full -z-20 animate-sunset-mesh" />

      {/* Capa 2: Imagen de Palmeras CORREGIDA */}
      <div  
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
        style={{
          backgroundImage: "url('/bgpalmerasch.png')",
          /* CAMBIO 1: Position center bottom para que crezca desde abajo hacia arriba y centrado */
          backgroundPosition: 'center bottom', 
          backgroundRepeat: 'no-repeat',
          
          /* CAMBIO 2: 'cover' asegura que la imagen SIEMPRE cubra todo el alto y el ancho del div,
             recortando los sobrantes si es necesario, pero nunca dejando espacios vacíos. */
          backgroundSize: 'cover', 
          
          /* Si prefieres forzar ESTRICTAMENTE que coincida con el alto de la pantalla 
             (aunque deje huecos a los lados en pantallas muy anchas), 
             cambia la línea de arriba por: 
             backgroundSize: 'auto 100vh', 
          */

          mixBlendMode: 'screen', 
          opacity: 0.4,
          filter: 'brightness(1.2) contrast(1.1)'
        }}
      />
    </>
  );
}

export default BackgroundCC;
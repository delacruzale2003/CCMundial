import React from 'react';

const BackgroundCC: React.FC = () => {
  return (
    <>
      {/* NOTA: He eliminado la capa de animación "sunset-mesh" (amarilla) 
        porque chocaría con el rojo de tu fondo "bgcopamundial".
        Si la necesitas, puedes descomentarla, pero para este diseño 
        es mejor un fondo limpio.
      */}

      <div 
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
        style={{
          // 1. Referencia a tu imagen
          backgroundImage: "url('/bgccmundial.png')",
          
          // 2. LA CLAVE PARA TU REQUERIMIENTO:
          // 'center center' asegura que al recortarse en móviles,
          // se mantenga el foco en el medio de la imagen.
          backgroundPosition: 'center center', 
          
          // 3. COMPORTAMIENTO RESPONSIVO:
          // 'cover' escala la imagen para llenar todo el contenedor.
          // En PC (16:9) se verá casi entera.
          // En Móvil (vertical) hará zoom para llenar la altura 
          // y recortará los lados, dejando solo el centro visible.
          backgroundSize: 'cover', 
          
          backgroundRepeat: 'no-repeat',
          
          // He quitado la opacidad y el mixBlendMode anteriores
          // para que se vean los colores rojos originales vibrantes.
          // Si lo quieres más oscuro para que resalte el texto, 
          // puedes agregar un 'brightness' bajo.
          filter: 'brightness(1.0)' 
        }}
      />
      
      {/* Opcional: Una capa oscura transparente encima si el texto blanco no se lee bien */}
      {/* <div className="fixed inset-0 w-full h-full -z-0 bg-black/20" /> */}
    </>
  );
}

export default BackgroundCC;
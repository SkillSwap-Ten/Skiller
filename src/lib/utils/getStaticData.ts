/**
 * Generan descripciones para las 5 comunidades de la plataforma
 * (development, marketing, design, communication, entertainment)
 * y dependiendo de la comunidad especificada devolverá un string
 * con la información, ya sea desde una perspectiva impersonal
 * o personal.
 */

export const getMyCommunityInfo = (community: string | undefined): string => {
    switch (community) {
        case "Desarrollo":
            return `Tu comunidad es Desarrollo. Aquí viven las mentes inquietas del código y amantes de los retos lógicos que transforman ideas en realidad digital. 🚀💻`;
        case "Marketing":
            return `Tu comunidad es Marketing. Estás rodeado de creativos y estrategas, con un olfato increíble para las tendencias. ¡Saben cómo hacer que el mundo los escuche! 📈🎯`;
        case "Comunicación":
            return `Tu comunidad es Comunicación. Aquí reinan los que dominan las palabras, conectan con el mundo y saben cómo contar historias que inspiran. 🗣️✨`;
        case "Diseño":
            return `Tu comunidad es Diseño. Estás entre artistas visuales, creadores de experiencias y amantes de lo estético. Ven la belleza donde otros no la notan. 🎨🧠`;
        case "Entretenimiento":
            return `Tu comunidad es Entretenimiento. Aquí se vibra alto con creatividad, carisma y pasión por hacer reír, emocionar y entretener al mundo. 🎭📺`;
        default:
            return `¡Ups! Aún no reconocemos esta comunidad, pero seguro que es igual de genial. 😎`;
    }
};

export const getCommunityInfo = (community: string | undefined): string => {
    switch (community) {
        case "Desarrollo":
            return `La comunidad de este usuario es Desarrollo. Aquí se encuentran las mentes inquietas del código y amantes de los retos lógicos que transforman ideas en realidad digital. 🚀💻`;
        case "Marketing":
            return `La comunidad de este usuario es Marketing. Está rodeado de creativos y estrategas, con un olfato increíble para las tendencias. ¡Saben cómo hacer que el mundo los escuche! 📈🎯`;
        case "Comunicación":
            return `La comunidad de este usuario es Comunicación. Aquí reinan los que dominan las palabras, conectan con el mundo y saben cómo contar historias que inspiran. 🗣️✨`;
        case "Diseño":
            return `La comunidad de este usuario es Diseño. Está entre artistas visuales, creadores de experiencias y amantes de lo estético. Ven la belleza donde otros no la notan. 🎨🧠`;
        case "Entretenimiento":
            return `La comunidad de este usuario es Entretenimiento. Aquí se vibra alto con creatividad, carisma y pasión por hacer reír, emocionar y entretener al mundo. 🎭📺`;
        default:
            return `¡Ups! Aún no reconocemos esta comunidad, pero seguro que es igual de genial. 😎`;
    }
};

/**
 * Genera habilidades digitales categorizadas para las 5 comunidades de la plataforma
 * (development, marketing, design, communication, entertainment)
 * y devuelve un único string con todas las skills separadas por comas.
 */
export const getAllSkills = (): string => {
    const development = [
        "HTML",
        "CSS",
        "React",
        "Next.js",
        "Node.js",
        "Express",
        "Python",
        "Django",
        "Flask",
        "Java",
        "Spring Boot",
        "JavaScript",
        "TypeScript",
        "Swagger",
        "Ruby",
        "C#",
        "C++",
        "C+",
        "C",
        "NPM",
        ".NET",
        "PHP",
        "Laravel",
        "Bases de Datos",
        "NoSQL",
        "JSON",
        "API",
        "RESTFul",
        "CRUD",
        "SQL",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "GraphQL",
        "APIs REST",
        "Docker",
        "Kubernetes",
        "AWS",
        "Linux",
        "Widows",
        "Apple/IOS",
        "Android",
        "Azure",
        "Render",
        "Git",
        "GitHub",
        "IA",
        "Software",
        "Hardware",
        "CI/CD",
        "Flutter",
        "Dart",
        "React Native",
        "Mobile",
        "Jest",
        "Playwright",
        "Prisma",
        "Vite",
        "Webpack",
        "Sass",
        "Styled Components",
        "Tailwind CSS",
        "Bootstrap",
        "Hosting",
        "VPN",
        "QA",
        "Testing",
        "Microservicios",
        "Electrónica",
        "Biometría",
        "Física",
        "Lógica",
        "Algoritmia",
        "Despliegue",
        "Ingeniería de Requisitos",
        "Arquitectura de Software",
        "Patrones de Diseño",
        "Estructura de Datos"
    ];

    const marketing = [
        "SEO",
        "SEM",
        "Google Ads",
        "Meta Ads",
        "Email Marketing",
        "Contenidos",
        "Growth Hacking",
        "Automatización",
        "Gestión de CRM",
        "Google Analytics",
        "Gestión",
        "Posicionamiento de Marca",
        "Copywriting",
        "Rendimiento",
        "Optimización de Conversiones",
        "Análisis de Datos",
        "Investigación UX",
        "Remarketing",
        "Estrategias de Mercado",
        "E-commerce",
        "Pruebas A/B",
        "Hashtags",
        "Leads",
        "Seguimiento de KPIs",
        "Campañas",
        "Productos",
        "Negociación",
        "Investigación",
        "Glocalización",
        "Afiliados",
        "Proovedores",
        "Video Marketing",
        "Podcast Marketing",
    ];

    const design = [
        "Diseño UI",
        "Diseño UX",
        "Diseño Gráfico",
        "Diseño Crossmedia",
        "Diseño Web",
        "Diseño Interactivo",
        "Diseño de Producto",
        "Identidad de Marca",
        "Tipografía",
        "Teoría del Color",
        "Maquetación",
        "Ilustración",
        "Gráficos en Movimiento",
        "Modelado 3D",
        "Prototipado",
        "Figma",
        "Adobe XD",
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Adobe Premiere",
        "Adobe Substance",
        "ZBrush",
        "SketchUp",
        "Revit",
        "AutoCAD",
        "Adobe After Effects",
        "Cinema 4D",
        "Blender",
        "Sistemas de Diseño",
        "Wireframing",
        "Diseño Responsivo",
        "Accesibilidad Web",
        "Dirección de Vestuario",
        "Diseño de Modas",
        "Dirección Creativa",
        "Narrativa visual",
        "Design Thinking",
        "Pruebas de Usabilidad",
        "Dirección de Arte",
        "Diseño de Interacción",
        "Bibliotecas de Componentes",
        "Logotipado",
        "Diseño Editorial",
        "Frameworks"
    ];

    const communication = [
        "Oratoria",
        "Estrategias de Contenido",
        "Relaciones con Medios",
        "Comunicación de Crisis",
        "Redacción",
        "Discursos",
        "Vocalización",
        "Fonética",
        "Idiomas",
        "Edición de Textos",
        "Narrativa Transmedia",
        "Gestión de Comunidad",
        "Redes Sociales",
        "Comunicación Interna",
        "Comunicación Corporativa",
        "Entrevistas",
        "Producción de Contenido",
        "Podcast",
        "Locución",
        "Maquillaje",
        "Periodismo",
        "Guionismo",
        "Mensaje de Marca",
        "Storytelling",
        "Persuasión",
        "Presentaciones",
        "Escritura Creativa",
        "Comunicación intercultural",
        "Comunicación visual",
        "Notas de Prensa",
        "Adobe Behance",
        "LinkedIn",
        "Habilidades Blandas",
        "Networking",
        "Moderación",
        "Eventos",
    ];

    const entertainment = [
        "Edición de Video",
        "Audiovisual",
        "Producción Musical",
        "Ingeniería de Sonido",
        "Mezcla de DJ",
        "Animación 3D",
        "Animación 2D",
        "Streaming",
        "Shorts",
        "Reels",
        "Radio",
        "Arte Digital",
        "Cortometraje",
        "Documental",
        "Cinematografía",
        "Fotografía",
        "Dirección de video",
        "Storyboard",
        "Actuación",
        "Doblaje",
        "Videojuegos",
        "YouTube",
        "TikTok",
        "Instagram",
        "Facebook",
        "Twitter/X",
        "Threads",
        "ArtStation",
        "Reddit",
        "Host",
        "Influencer",
        "Iluminación",
        "Efectos (VFX)",
        "Corrección de Color",
        "Postproducción",
        "Composición",
        "Escenografía",
        "Realidad Aumentada",
        "Fotomontaje",
        "Concept Art",
        "Creación de Personajes",
        "Dirección Audiovisual",
        "Medios Interactivos",
    ];

    // Unir todos los arrays en uno solo
    const allSkills = [
        ...development,
        ...marketing,
        ...design,
        ...communication,
        ...entertainment,
    ];

    // Convertir a string separado por comas
    const allSkillsString = allSkills.join(",");

    return allSkillsString;
};

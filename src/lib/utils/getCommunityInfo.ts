export const getMyCommunityInfo = (category: string | undefined): string => {
    switch (category) {
        case "Desarrollo":
            return `Tu comunidad es Desarrollo. Aquí viven las mentes inquietas del código, amantes de los retos lógicos y los que transforman ideas en realidad digital. 🚀💻`;
        case "Marketing":
            return `Tu comunidad es Marketing. Estás rodeado de personas creativas, estratégicas y con un olfato increíble para las tendencias. ¡Saben cómo hacer que el mundo los escuche! 📈🎯`;
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

export const getCommunityInfo = (category: string | undefined): string => {
    switch (category) {
        case "Desarrollo":
            return `La comunidad de este usuario es Desarrollo. Aquí se encuentran las mentes inquietas del código, amantes de los retos lógicos y aquellos que transforman ideas en realidad digital. 🚀💻`;
        case "Marketing":
            return `La comunidad de este usuario es Marketing. Está rodeado de personas creativas, estratégicas y con un olfato increíble para las tendencias. ¡Saben cómo hacer que el mundo los escuche! 📈🎯`;
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

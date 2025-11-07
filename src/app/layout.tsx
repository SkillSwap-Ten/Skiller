import type { Metadata, Viewport } from "next";
import { ToastContainer } from "react-toastify";
import { Urbanist } from "next/font/google";
import RouteHandler from './RouteHandler';
import Providers from './Providers';
import "react-toastify/dist/ReactToastify.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "SkillSwap · Looking for Skill",
  description: "Intercambia habilidades del entorno digital, aprende nuevas destrezas y conecta con otros creativos en SkillSwap. La comunidad donde el saber se comparte.",
  authors: [
    { name: "David Francisco Blandón Mena, Luisa Fernanda Ramírez Cardona, Joan Sebastián Zapata Caro, Jonathan Escobar Molina, David Steven Medina Urrego, Arlex Mauricio Zapata Mesa" }
  ],
  creator: "SkillSwap Ten",
  publisher: "SkillSwap Ten",
  category: "Digital Networking",
  verification: {
    google: "zeXzYez8ujuU90o-IEw2CjluRDBMHaT0bnc-3IcjuAI",
  },
  keywords: [
    "Skills", "SkillSwap", "Skill-Swap", "Skill 10", "Skill-10", "Skill-Ten", "Skill Ten", "Skiller", "SkillSwap Ten", "SkillSwap-Ten", "Skill-Swap-Ten", "Swap", "skillswapten",
    "Conocer", "Habilidades", "Abilities", "Learning", "Digital", "Tech", "Development", "Software", "Entertainment", "Request", "Communication", "Fortalecer", "Sitio Web",
    "Community", "Improve", "Marketing", "Virtual", "Online", "Code", "Design", "Art", "Media", "Strenghts", "Medellín", "Trabajo", "Colombia", "TypeScript", "Website", "App",
    "Multimedia", "Content", "Creator", "Desarrollo", "Backend", "Frontend", "Diseño", "Entretenimiento", "Mercadeo", "Proyectos", "Riwi", "Redes", "Practicar", "C-sharp", "DevOps",
    "Comunicación", "Tecnologías", "Aprender", "Estudio", "Intercambio", "Exchange", "Luisa", "Fernanda", "Ramírez", "Cardona", "Jonathan", "Escobar", "Urrego", "Dotnet", "Docker",
    "Arlex", "Zapata", "Stiven", "David", "Molina", "Mesa", "Medina", "Joan", "Sebastián", "Caro", "David", "Francisco", "Blandón", "Mena", "franccoina", "Laboral", "Deploy",
    "frn", "Vercel", "Destrezas", "Knowledges", "Conocimientos", "Descubrir", "Intercambiar", "Social", "Creativos", "Comunidad", "Cultura", "Github", "Experiencia", "GitHub",
    "Behance", "Linkedin", "Jobs", "Web", "UX", "UI", "Nextjs", "Match", "Conectar", "Connect", "Discover", "New", "Nuevo", "Saberes", "Ideas", "Solicitud", "Colaborar", "API",
    "Solicitar", "Mensajes", "Messages", "Compartir", "Share", "DevOps", "Frontend", "Backend", ".NET", "Csharp", "C#", "Azure", "Repository", "Repositorio", "Profesional",
    "intercambio de habilidades", "aprendizaje digital", "comunidad creativa", "red de habilidades", "plataforma de habilidades", "colaboración en habilidades", "desarrollo de habilidades",
    "trueque de conocimientos", "networking digital", "Skill exchange", "digital skills marketplace", "creative skills hub", "online skills sharing", "professional skills network",
    "collaborative learning platform", "tech skills swap", "digital talent exchange", "Skill10"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'https://skillswapten.vercel.app/favicon.ico',
    shortcut: 'https://skillswapten.vercel.app/favicon.ico',
    apple: 'https://skillswapten.vercel.app/favicon.ico',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillSwap · Looking for Skill',
    creator: '@franccoina',
    creatorId: '1664752708694208515',
    siteId: '1664752708694208515',
    description: 'Aventúrate a intercambiar habilidades digitales con SkillSwap.',
    images: ['https://skillswapten.vercel.app/img/skillswap-opengraph-tw.png'],
  },
  facebook: {
    appId: "804095175706410",
  },
  openGraph: {
    title: "SkillSwap · Looking for Skill",
    description: "Aventúrate a intercambiar habilidades digitales con SkillSwap.",
    url: "https://skillswapten.vercel.app",
    siteName: "SkillSwap",
    type: "website",
    images: [
      {
        url: "https://skillswapten.vercel.app/img/skillswap-opengraph-og.png",
        width: 1200,
        height: 630,
        alt: "SkillSwap-Ten",
      },
    ],
  },
  metadataBase: new URL("https://skillswapten.vercel.app"),
  alternates: {
    canonical: "https://skillswapten.vercel.app",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="sitedomain" content="https://skillswapten.vercel.app" />
        <meta name="organization" content="SkillSwap-Ten, frn!, riwi" />
        <meta name="designer" content="David Francisco Blandón Mena, Luisa Fernanda Ramírez Cardona, Joan Sebastián Zapata Caro" />
        <meta name="copyright" content="© 2024 SkillSwap. Todos los derechos reservados." />
        <meta name="revisit-after" content="15days" />
      </head>
      <body className={urbanist.className}>
        <Providers>
          <RouteHandler>
            {children}
          </RouteHandler>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}

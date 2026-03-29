import type { Metadata, Viewport } from "next";
import { ToastContainer } from "react-toastify";
import { Urbanist } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  applicationName: "SkillSwap",
  verification: {
    google: "-OmKz-uTTgsQHQVsVnofFirPo8N0j7r9WWoO7--SUOc",
  },
  metadataBase: new URL("https://skill-swap-ten.vercel.app"),
  keywords: [
    "Skills", "SkillSwap", "Skill-Swap", "Skill 10", "Skill-10", "Skill-Ten", "Skill Ten", "Skiller", "SkillSwap Ten", "SkillSwap-Ten", "Skill-Swap-Ten", "Swap", "skillswapten",
    "Conocer", "Habilidades", "Abilities", "Learning", "Digital", "Tech", "Development", "Software", "Entertainment", "Request", "Communication", "Fortalecer", "Sitio Web",
    "Community", "Improve", "Marketing", "Virtual", "Online", "Code", "Design", "Art", "Media", "Strenghts", "Medellín", "Trabajo", "Colombia", "TypeScript", "Website", "App",
    "Multimedia", "Content", "Creator", "Desarrollo", "Backend", "Frontend", "Diseño", "Entretenimiento", "Mercadeo", "Proyectos", "Riwi", "Redes", "Practicar", "C-sharp", "DevOps",
    "Comunicación", "Tecnologías", "Aprender", "Estudio", "Intercambio", "Exchange", "Luisa", "Fernanda", "Ramírez", "Cardona", "Jonathan", "Escobar", "Urrego", "Dotnet", "Docker",
    "Arlex", "Zapata", "Stiven", "David", "Molina", "Mesa", "Medina", "Joan", "Sebastián", "Caro", "David", "Francisco", "Blandón", "Mena", "franccoina", "Laboral", "Deploy",
    "frn", "Vercel", "Destrezas", "Knowledges", "Conocimientos", "Descubrir", "Intercambiar", "Social", "Creativos", "Comunidad", "Cultura", "Github", "Experiencia", "GitHub",
    "Behance", "Linkedin", "Jobs", "Desarrollo Web", "UX", "UI", "Nextjs", "Match", "Conectar", "Connect", "Discover", "New", "Nuevo", "Saberes", "Ideas", "Solicitud", "Colaborar", "API",
    "Solicitar", "Mensajes", "Messages", "Compartir", "Share", ".NET", "Csharp", "C#", "Azure", "Repository", "Repositorio", "Profesional", "desarrollo de habilidades",
    "intercambio de habilidades", "aprendizaje digital", "comunidad creativa", "red de habilidades", "plataforma de habilidades", "colaboración en habilidades", "tech skills swap",
    "trueque de conocimientos", "networking digital", "Skill exchange", "digital skills marketplace", "creative skills hub", "online skills sharing", "professional skills network",
    "collaborative learning platform", "digital talent exchange", "Skill10", "Skill10'", "Skill 10'"
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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillSwap · Looking for Skill',
    creator: '@franccoina',
    creatorId: '1664752708694208515',
    siteId: '1664752708694208515',
    description: 'Aventúrate a intercambiar habilidades digitales con SkillSwap.',
    images: ['/img/skillswap-opengraph.png'],
  },
  facebook: {
    appId: "804095175706410",
  },
  openGraph: {
    title: "SkillSwap · Looking for Skill",
    description: "Aventúrate a intercambiar habilidades digitales con SkillSwap.",
    url: "https://skill-swap-ten.vercel.app",
    siteName: "SkillSwap",
    type: "website",
    images: [
      {
        url: "/img/skillswap-opengraph.png",
        width: 1200,
        height: 630,
        alt: "SkillSwap-Ten",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  other: {
    sitedomain: "https://skill-swap-ten.vercel.app",
    organization: "SkillSwap-Ten, franccoina, riwi",
    designer:
      "David Francisco Blandón Mena, Luisa Fernanda Ramírez Cardona, Joan Sebastián Zapata Caro",
    copyright: "© 2024 SkillSwap. Todos los derechos reservados.",
    "revisit-after": "15days",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={urbanist.className}>
        <Providers>
          <RouteHandler>
            {children}
          </RouteHandler>
        </Providers>
        <ToastContainer
          theme="colored"
        />
        <SpeedInsights />
      </body>
    </html>
  );
}
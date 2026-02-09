import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Primary font - Space Grotesk (per design-doc §3)
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

// Monospace font - JetBrains Mono (for URLs and code)
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Quaso - Your Second Brain Crystallizes Here',
  description:
    'AI transforms any URL into structured memory. Never forget why you saved something.',
  keywords: ['bookmarks', 'AI', 'memory', 'URL', 'knowledge management', 'second brain'],
  authors: [{ name: 'Quaso' }],
  openGraph: {
    title: 'Quaso - Intelligent URL Memory System',
    description: 'AI transforms any URL into structured memory.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Clash Display from Fontshare CDN */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

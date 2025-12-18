import './globals.css';
import { Toaster } from '../components/ui/toaster';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';

export const metadata = {
  title: 'MouldTrack',
  description: 'A web-based dashboard for mould maintenance and monitoring.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Navbar/>
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}

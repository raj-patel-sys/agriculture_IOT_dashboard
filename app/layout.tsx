import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ui/theme-provider'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import StarBackground from '@/components/animations/star-background'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgroCense IoT - Smart Agriculture Solutions',
  description: 'Advanced IoT solutions for modern agriculture. Monitor and optimize your crops with real-time sensor data.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <StarBackground />
          <Header />
          <main className="pt-16 min-h-[calc(100vh-300px)]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
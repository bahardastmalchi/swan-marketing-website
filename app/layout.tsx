import type { Metadata, Viewport } from 'next'
import './globals.css'
import './responsive-overrides.css'

export const metadata: Metadata = { title: 'Swan Marketing — A more beautiful business world', description: 'Swan is a Dubai-based digital marketing and creative agency for ambitious brands.' }
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f4f2ed' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html> }

export const dynamic = 'force-static'

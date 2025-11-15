import './globals.css'

export const metadata = {
  title: 'WaveStream - Free Music Player',
  description: 'Free legal music streaming with modern 90s style',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
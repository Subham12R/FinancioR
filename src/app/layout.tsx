import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { dark, neobrutalism, shadcn } from '@clerk/themes'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Financio.',
  description: 'A Finance Management App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider

    
    appearance={{
      baseTheme: dark,
      variables: {
        colorBorder: "#fafafa",
        colorInput: "#fafafa",
        colorPrimary: "#ff0000",
        colorRing: "#ff0000",
        colorText: "#ffffff",
        colorTextSecondary: "#ffffff",
        colorTextOnPrimaryBackground: "#ffffff"
      } 
      
    }}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
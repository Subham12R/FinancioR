import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Geist, Geist_Mono, } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '../../providers/query-provider'



const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Clerk Based advanced authentication',
}


const localization = {
  formButtonPrimary: 'Continue',
  signUp: {
    start: {
      subtitle: 'Already have an account?',

    },
  }, 
  signIn: {
    start: {
      title: "Welcome to the Dashboard",
      subtitle: 'Sign in to access the Dashboard',

    },
  }     
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
    localization={localization}
    
    appearance={{

      elements: {
      card: 'backdrop-blur-2xl bg-white/5 border border-white/20 shadow-2xl rounded-2xl p-6 text-white ',
      formButtonPrimary: 'bg-amber-50 text-black hover:bg-white transition font-semibold py-2 px-4 rounded-lg',
      headerTitle: 'text-white text-3xl font-bold mb-1',
      headerSubtitle: 'text-amber-50 text-base mb-4',
      socialButtonsBlockButton: 'bg-white/10 hover:bg-white/20 transition text-white font-medium rounded-lg',
      footer: 'text-zinc-900 text-xs mt-6',
      formFieldInput: 'bg-white/5 backdrop-blur-md text-white placeholder-white/70 border border-white/20 focus:ring-2 focus:ring-amber-50 rounded-lg px-4 py-2',
      formFieldLabel: 'text-white mb-1 text-sm',
      cardAlert: 'hidden', // hide deployment mode
      clerk: 'hidden', // hide "Secured by Clerk"
    },

  }}
    >
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <QueryProvider>
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
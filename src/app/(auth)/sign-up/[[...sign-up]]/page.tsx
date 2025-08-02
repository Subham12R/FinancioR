'use client'

import { Loader2 } from 'lucide-react';
import { SignUp, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import React from 'react';
import Particles from '@/components/Particles/Particles';

const SignUpPage = () => {
  return (
    <div className='relative min-h-screen w-full grid grid-cols-1 bg-zinc-900'>
      {/* Background Particles */}
      <div className='absolute inset-0 z-0'>
        <Particles />
      </div>

      {/* Sign-In Form Container */}
      <div className='relative z-10 flex flex-col items-center justify-center px-4 bg-black/50'>
        <div className='flex items-center justify-center mt-8'>
          <ClerkLoaded>
            <SignUp path='/sign-up' />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2
              className='animate-spin text-muted-foreground'
              aria-label='Loading sign-in form'
            />
          </ClerkLoading>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

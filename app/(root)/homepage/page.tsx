// 'use client'
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { signIn } from "next-auth/react";
// import { FcGoogle } from "react-icons/fc";

// export default function Home() {
//   const handleGoogleSignIn = async () => {
//     try {
//       await signIn('google', { callbackUrl: '/dashboard' });
//     } catch (error) {
//       console.error('Sign-in error:', error);
//     }
//   };

'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', { callbackUrl: '/dashboard', redirect: false });
      if (result?.error) {
        console.error('Sign-in error:', result.error);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  // ... rest of your component remains the same


  return (
    <div className="lg:flex mx-8 lg:mx-44 sm:mx-16">
      <div className="h-screen  mt-28 ">
        <div className="text-xl sm:text-4xl font-light mt-6 text-start text-gray-800 ">
          Monitor Your Cash Flow
        </div>
        <div className="text-3xl sm:text-6xl font-bold text-start text-gray-800 flex flex-row justify-start mt-8">
          Manage Your Finances Effortlessly
        </div>
        <div className="text-lg sm:text-xl font-bold mt-4 text-start text-gray-800 ">
          Secure, Reliable, and Easy-to-Use Money Management
        </div>
        <div className="mt-4 text-start">
          <Button
            variant="outline"
            className="border border-gray-500 bg-gray-200 text-xl font-bold hover:bg-gray-400 flex items-center gap-2"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </Button>
        </div>
      </div>
      <div>
        <Image src='/assets/imag3.jpg' unoptimized alt={"Money management illustration"} height={600} width={600} className="justify-center hidden lg:block mt-2 sm:mt-16 mr-12" />
      </div>
    </div>
  )
}
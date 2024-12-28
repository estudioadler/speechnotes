'use client'

import { Button } from "@/components/ui/button"
import { GithubLogo, GoogleLogo } from "@phosphor-icons/react/dist/ssr"
import { signIn } from "next-auth/react"

export default function LoginPage() {

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-medium">Bem-vindo!. <br /> <span className="text-muted-foreground">Por favor faca login.</span></h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div >
          <div className="space-y-6">
            <div>
              <Button
                onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
                variant="outline"
                size={"lg"} 
                className="w-full"
              >
                <GithubLogo className="mr-2 h-5 w-5" />
                Sign in with GitHub
              </Button>
            </div>
            <div>
              <Button
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                variant="outline"
                size={"lg"}
                className="w-full">
                <GoogleLogo className="mr-2 h-5 w-5" />
                Sign in with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


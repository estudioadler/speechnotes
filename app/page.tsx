import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Bem-vindo ao Seu Sistema de Notas
        </h1>
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
          Capture suas ideias em áudio ou texto, de forma simples e rápida.
        </p>
        <Link href="/login">
          <Button>
            Começar Agora
          </Button>
        </Link>
      </main>
    </div>
  )
}


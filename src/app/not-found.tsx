import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Página não encontrada
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="btn btn-sm btn-primary normal-case tracking-normal text-sm font-medium px-4 py-2"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

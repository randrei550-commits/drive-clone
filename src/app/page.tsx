import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Drive Clone</h1>
      <p className="text-muted-foreground">
        T1: Next.js 16 + Tailwind v4 + shadcn/ui
      </p>
      <Button>Merge! 🚀</Button>
    </main>
  );
}
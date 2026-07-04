import { Link } from "wouter";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-8 text-center md:p-12">
          <h3 className="text-2xl font-semibold tracking-tight">Ready to power your application?</h3>
          <p className="mx-auto mt-2 max-w-2xl text-foreground/80">
            Talk to our battery experts for sizing, chemistry selection and integration support.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button asChild>
              <Link href="/contact">Request Quote</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/products">Explore Products</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

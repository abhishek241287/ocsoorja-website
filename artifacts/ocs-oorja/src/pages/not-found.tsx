import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-20 text-center">
      <Seo title="Page not found" robots="noindex, nofollow" />
      <h1 className="text-2xl font-bold">404 - Page not found</h1>
      <p className="mt-4 text-foreground/70">
        The page you are looking for does not exist.
      </p>
      <Button className="mt-8" asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </Container>
  );
}

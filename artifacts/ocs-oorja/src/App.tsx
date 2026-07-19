import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Products from "@/pages/products";
import ProductDetail from "@/pages/product-detail";
import Projects from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import Blog from "@/pages/blog";
import BlogDetail from "@/pages/blog-detail";
import DesignSystem from "@/pages/design-system";
import EngineeringToolsHub from "@/pages/engineering-tools/index";
import SolarSizingCalculator from "@/pages/engineering-tools/solar-sizing";
import BatteryBackupCalculator from "@/pages/engineering-tools/battery-backup";
import InverterSizingCalculator from "@/pages/engineering-tools/inverter-sizing";
import CableSizingCalculator from "@/pages/engineering-tools/cable-sizing";
import ROICalculatorPage from "@/pages/engineering-tools/roi-calculator";
import EVChargingCalculator from "@/pages/engineering-tools/ev-charging";
import LoadCalculatorPage from "@/pages/engineering-tools/load-calculator";
import ScrollRestoration from "@/components/ScrollRestoration";
import { Analytics } from "@/components/Analytics";
import { WhatsAppWidget } from "@/components/global/WhatsAppWidget";

const queryClient = new QueryClient();

// Internal Blog Publisher tool — development workspace only. The conditional
// is statically false in production builds, so the page is never bundled.
const BlogPublisher = import.meta.env.DEV
  ? lazy(() => import("@/pages/blog-publisher"))
  : null;

// Internal Gallery Publisher tool — development workspace only, same pattern
// as the Blog Publisher above.
const GalleryPublisher = import.meta.env.DEV
  ? lazy(() => import("@/pages/gallery-publisher"))
  : null;

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/products" component={Products} />
        <Route path="/products/:slug" component={ProductDetail} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:slug" component={ProjectDetail} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogDetail} />
        <Route path="/engineering-tools" component={EngineeringToolsHub} />
        <Route path="/engineering-tools/solar-sizing" component={SolarSizingCalculator} />
        <Route path="/engineering-tools/battery-backup" component={BatteryBackupCalculator} />
        <Route path="/engineering-tools/inverter-sizing" component={InverterSizingCalculator} />
        <Route path="/engineering-tools/cable-sizing" component={CableSizingCalculator} />
        <Route path="/engineering-tools/roi-calculator" component={ROICalculatorPage} />
        <Route path="/engineering-tools/ev-charging" component={EVChargingCalculator} />
        <Route path="/engineering-tools/load-calculator" component={LoadCalculatorPage} />
        <Route path="/design-system" component={DesignSystem} />
        {BlogPublisher ? (
          <Route path="/blog-publisher">
            <Suspense
              fallback={
                <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
                  Loading the Blog Publisher…
                </div>
              }
            >
              <BlogPublisher />
            </Suspense>
          </Route>
        ) : null}
        {GalleryPublisher ? (
          <Route path="/gallery-publisher">
            <Suspense
              fallback={
                <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
                  Loading the Gallery Publisher…
                </div>
              }
            >
              <GalleryPublisher />
            </Suspense>
          </Route>
        ) : null}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollRestoration />
          <Analytics />
          <Router />
          <WhatsAppWidget />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

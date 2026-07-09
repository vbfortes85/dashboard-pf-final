import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Contratos from "./pages/Contratos";
import Indicadores from "./pages/Indicadores";
import CAGED from "./pages/CAGED";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/contratos"} component={Contratos} />
      <Route path={"/indicadores"} component={Indicadores} />
      <Route path={"/caged"} component={CAGED} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

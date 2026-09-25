import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import WhatsAppFab from "~/components/WhatsAppFab";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <div class="flex min-h-screen flex-col">
            <Header />
            <main class="flex-1">
              <Suspense>{props.children}</Suspense>
            </main>
            <Footer />
          </div>
          <WhatsAppFab />
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}

import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { products } from "./data/catalog";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { HomePage } from "./pages/HomePage";
import { InformationPage } from "./pages/InformationPage";
import { MenuPage } from "./pages/MenuPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { SignInPage } from "./pages/SignInPage";

const rootRoute = createRootRoute({
  component: Outlet,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const menuRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/menu",
  component: MenuPage,
});

const informationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/informacoes",
  component: InformationPage,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/entrar",
  component: SignInPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/menu/produtos/$productId",
  loader: ({ params }) => {
    const product = products.find((item) => item.id === params.productId);

    if (!product) {
      throw redirect({ to: "/menu" });
    }

    return product;
  },
  component: ProductDetailPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/carrinho",
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/carrinho/finalizar",
  component: CheckoutPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  menuRoute,
  informationRoute,
  signInRoute,
  productRoute,
  cartRoute,
  checkoutRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

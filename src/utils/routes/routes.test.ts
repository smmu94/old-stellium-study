import { isPublicRoute, ROUTES, NAVIGATION_ITEMS, PUBLIC_ROUTES } from "./routes";

describe("Route Utilities", () => {
  describe("isPublicRoute", () => {
    it("should return true for all defined public routes", () => {
      PUBLIC_ROUTES.forEach((route) => {
        expect(isPublicRoute(route)).toBe(true);
      });
    });
    it("should return false for dashboard/private routes", () => {
      const privateRoutes = [
        ROUTES.DASHBOARD,
        ROUTES.CALENDAR,
        ROUTES.STATISTICS,
        ROUTES.SETTINGS,
      ];
      privateRoutes.forEach((route) => {
        expect(isPublicRoute(route)).toBe(false);
      });
    });
    it("should return false for completely unknown routes", () => {
      const unknownRoutes = ["/admin", "/profile", "/not-found"];
      unknownRoutes.forEach((route) => {
        expect(isPublicRoute(route)).toBe(false);
      });
    });
  });

  describe("NAVIGATION_ITEMS", () => {
    it("should have correct labels and hrefs", () => {
      const expectedItems = [
        { href: ROUTES.FEATURES, label: "Features" },
        { href: ROUTES.ABOUT, label: "About" },
        { href: ROUTES.CONTACT, label: "Contact" },
        { href: ROUTES.AUTH, label: "Sign In" },
      ];
      expect(NAVIGATION_ITEMS).toEqual(expectedItems);
    });
  });
});

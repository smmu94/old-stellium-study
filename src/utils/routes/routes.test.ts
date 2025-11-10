import { isPublicRoute, ROUTES } from "./routes";

describe("Route Utilities", () => {
  describe("isPublicRoute", () => {
    it("should return true for all defined public routes", () => {
      expect(isPublicRoute(ROUTES.HOME)).toBe(true);
      expect(isPublicRoute(ROUTES.FEATURES)).toBe(true);
      expect(isPublicRoute(ROUTES.ABOUT)).toBe(true);
      expect(isPublicRoute(ROUTES.CONTACT)).toBe(true);
      expect(isPublicRoute(ROUTES.AUTH)).toBe(true);
    });

    it("should return false for undefined routes", () => {
      expect(isPublicRoute("/admin")).toBe(false);
      expect(isPublicRoute("/dashboard")).toBe(false);
      expect(isPublicRoute("/profile")).toBe(false);
      expect(isPublicRoute("/settings")).toBe(false);
    });
  });
});
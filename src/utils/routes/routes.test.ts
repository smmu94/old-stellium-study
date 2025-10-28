import { isPublicRouteWithFooter, ROUTES } from "./routes";

describe("Route Utilities", () => {
    describe("isPublicRouteWithFooter", () => {
        it("should return true for all defined public routes", () => {
            expect(isPublicRouteWithFooter(ROUTES.HOME)).toBe(true);
            expect(isPublicRouteWithFooter(ROUTES.FEATURES)).toBe(true);
            expect(isPublicRouteWithFooter(ROUTES.ABOUT)).toBe(true);
            expect(isPublicRouteWithFooter(ROUTES.CONTACT)).toBe(true);
            expect(isPublicRouteWithFooter(ROUTES.AUTH)).toBe(true);
        });

        it("should return false for undefined routes", () => {
            expect(isPublicRouteWithFooter("/admin")).toBe(false);
            expect(isPublicRouteWithFooter("/dashboard")).toBe(false);
            expect(isPublicRouteWithFooter("/profile")).toBe(false);
            expect(isPublicRouteWithFooter("/settings")).toBe(false);
        });
    });
});
import { BRAND_ASSETS } from '@/utils/constants';
import { NAVIGATION_ITEMS, ROUTES } from '@/utils/routes/routes';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Navbar from '.';

describe('Navbar Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the navbar with correct structure', () => {
        render(<Navbar />);
        const nav = screen
            .getAllByRole('navigation')
            .find((n) => n.classList.contains('md:flex'));
        expect(nav).toBeInTheDocument();
    });

    it('should render the logo with correct attributes', () => {
        render(<Navbar />);
        const logo = screen.getByAltText('Stellium Study') as HTMLImageElement;
        expect(logo).toBeInTheDocument();
        expect(logo.src).toContain(BRAND_ASSETS.logo.light);
        expect(logo.width).toBe(200);
        expect(logo.height).toBe(50);
    });

    it('should render the logo link with correct href', () => {
        render(<Navbar />);
        const logoLink = screen.getByRole('link', { name: /stellium study/i });
        expect(logoLink).toBeInTheDocument();
        expect(logoLink).toHaveAttribute('href', ROUTES.HOME);
    });

    it('should render all navigation links with correct attributes', () => {
        render(<Navbar />);
        NAVIGATION_ITEMS.forEach(({ label, href }) => {
            const link = screen.getByRole('link', { name: label });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', href);
        });
    });

    it('should render the correct number of navigation links (excluding logo)', () => {
        render(<Navbar />);
        const navLinks = screen
            .getAllByRole('link')
            .filter((link) => !link.querySelector('img'));
        expect(navLinks).toHaveLength(NAVIGATION_ITEMS.length);
    });

    it('should render all expected navigation labels', () => {
        render(<Navbar />);
        NAVIGATION_ITEMS.forEach(({ label }) => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });
    it('should toggle mobile menu when burger icon is clicked', () => {
        render(<Navbar />);
        const toggleButton = screen.getByLabelText(/toggle menu/i);
        expect(screen.queryByTestId('mobile-nav')).not.toBeInTheDocument();
        fireEvent.click(toggleButton);
        const mobileNav = screen.getByTestId('mobile-nav');
        expect(mobileNav).toBeInTheDocument();
        NAVIGATION_ITEMS.forEach(({ label }) => {
            expect(within(mobileNav).getByText(label)).toBeInTheDocument();
        });
        fireEvent.click(toggleButton);
        expect(screen.queryByTestId('mobile-nav')).not.toBeInTheDocument();
    });
});

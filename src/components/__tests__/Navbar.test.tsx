import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MobileNav, DesktopNav } from "../navbar";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
    usePathname: jest.fn(),
}));

jest.mock("../../constants", () => ({
    sideNav: [
        { path: "/home", text: "Home", icon: <span>🏠</span> },
        { path: "/profile", text: "Profile", icon: <span>👤</span> },
    ],
}));

describe("Navbar Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("DesktopNav", () => {
        it("renders all side navigation links", () => {
            (usePathname as jest.Mock).mockReturnValue("/home");

            render(<DesktopNav />);

            // Check if all links render
            expect(screen.getByText("Home")).toBeInTheDocument();
            expect(screen.getByText("Profile")).toBeInTheDocument();

            // Check if the active link has the correct className
            expect(screen.getByText("Home").closest("a")).toHaveClass(
                "bg-[#8470FE]"
            );
        });
    });

    describe("MobileNav", () => {
        it("renders the menu toggle button", () => {
            render(<MobileNav />);
            expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("toggles the menu when the button is clicked", () => {
            render(<MobileNav />);
            const button = screen.getByRole("button");

            expect(
                screen.getByRole("navigation", { hidden: true }).parentElement
            ).toHaveClass("translate-x-full");

            // Click to open
            fireEvent.click(button);
            expect(
                screen.getByRole("navigation", { hidden: true }).parentElement
            ).toHaveClass("translate-x-0");

            // Click to close
            fireEvent.click(button);
            expect(
                screen.getByRole("navigation", { hidden: true }).parentElement
            ).toHaveClass("translate-x-full");
        });

        it("closes the menu when the overlay is clicked", () => {
            render(<MobileNav />);
            const button = screen.getByRole("button");
            fireEvent.click(button); // Open the menu

            const overlay = screen.getByTestId("overlay");
            fireEvent.click(overlay);
            expect(
                screen.getByRole("navigation", { hidden: true }).parentElement
            ).toHaveClass("translate-x-full");
        });
    });
});

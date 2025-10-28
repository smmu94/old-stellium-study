
import HomePage from "@/app/page";
import { render } from "@testing-library/react";
import createMockRouter from "next-router-mock";
import {createContext} from "react";

const withRouterContext = (component: React.ReactElement) => {
    const RouterContext = createContext(createMockRouter);
    return (
        <RouterContext.Provider value={createMockRouter}>
            {component}
        </RouterContext.Provider>
    );
};

describe("HomePage", () => {
    it("renders correctly", () => {
        const { container } = render(withRouterContext(<HomePage />));
        const title = container.querySelector("h1");
        expect(title).toHaveTextContent("Organize your academic life in a fun and effective way");
        const paragraph = container.querySelector("p");
        expect(paragraph).toHaveTextContent(
            "Stellium Study makes studying visually appealing and addictively organized. Start creating your schedule, adding notes, and tracking your progress today."
        );
        const signUpButton = container.querySelector("button");
        expect(signUpButton).toBeInTheDocument();
        const video = container.querySelector("video");
        expect(video).toBeInTheDocument();
    });
    it("contains a video with correct attributes", () => {
        const { container } = render(withRouterContext(<HomePage />));
        const video = container.querySelector("video");
        expect(video).toHaveAttribute("controls");
        expect(video).toHaveAttribute("poster", "/images/education.jpg");
        const source = video?.querySelector("source");
        expect(source).toHaveAttribute("src", "/video/education.mp4");
        expect(source).toHaveAttribute("type", "video/mp4");
    });
});

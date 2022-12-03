import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";


test("Render App", () => {
	render(<App />, { wrapper: BrowserRouter });
	const titleElement = screen.getByText(/RiceBook/i);
	expect(titleElement).toBeInTheDocument();
});

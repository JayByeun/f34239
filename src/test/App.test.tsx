import { render, screen } from "@testing-library/react";
import { describe, it, expect, test } from "vitest";
import App from "../App";
import React from "react";

test("renders learn react link", () => {
    render(<App />);
    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
});

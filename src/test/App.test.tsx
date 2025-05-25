import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import App from "../App";
import React from "react";
import userEvent from "@testing-library/user-event";

const mockGraphData = {
    nodes: [
        {
            data: {
                name: "Form A",
                component_id: "form-a",
            },
        },
    ],
    edges: [],
    forms: [
        {
            id: "form-a",
            field_schema: {
                properties: {
                    email: { type: "string" },
                    id: { type: "string" },
                },
            },
        },
    ],
};

beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockGraphData,
    }) as unknown as typeof fetch;
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe("App", () => {
    it("renders loading state initially", () => {
        render(<App />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders App after data is loaded", async () => {
        render(<App />);
        await waitFor(() => {
            expect(screen.getByText("Prefill")).toBeInTheDocument();
        });
    });

    it("renders loading on failed fetch", async () => {
        (fetch as any).mockImplementationOnce(() =>
            Promise.resolve({ ok: false, status: 500 })
        );
        render(<App />);
        await waitFor(() => {
            expect(screen.getByText(/Loading/i)).toBeInTheDocument();
        });
    });
});

describe("Field", () => {
    it("view mode by default > not clickable", async () => {
        render(<App />);
        await screen.findByText("Prefill");

        await userEvent.click(screen.getByTestId("first"));
        expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    });

    it("click toggle > enter edit mode", async () => {
        render(<App />);
        await screen.findByText("Prefill");

        await userEvent.click(screen.getByTestId("toggle"));

        const listener = vi.fn();
        const firstField = screen.getByTestId("first");
        firstField.addEventListener("click", listener);
        await userEvent.click(firstField);

        expect(listener).toHaveBeenCalledTimes(1);
    });

    it("click close button on emaild field > clear prfilled data", async () => {
        render(<App />);
        await screen.findByText("Prefill");

        await userEvent.click(screen.getByTestId("toggle"));
        expect(screen.getByTestId("third").textContent).toBe(
            "email: Form A.email"
        );

        const third = screen.getByTestId("clear");
        await userEvent.click(third);
    });
});

describe("Modal", () => {
    it("click non-prefilled field > open modal", async () => {
        render(<App />);
        await screen.findByText("Prefill");

        await userEvent.click(screen.getByTestId("toggle"));

        await userEvent.click(screen.getByTestId("first"));
        expect(screen.getByTestId("modal")).toBeVisible();
    });

    it("map 'id' with first field > field is filled with button", async () => {
        render(<App />);
        await screen.findByText("Prefill");

        await userEvent.click(screen.getByTestId("toggle"));
        await userEvent.click(screen.getByTestId("first"));
        await userEvent.click(screen.getByTestId("Form A"));
        await userEvent.click(screen.getByTestId("id"));
        await userEvent.click(screen.getByTestId("select"));

        expect(screen.getByTestId("first").textContent).toBe("id");
    });
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Eventos from "../instructor/eventos/Eventos";

describe("Eventos", () => {
  it("renders the form correctly", () => {
    render(
      <BrowserRouter>
        <Eventos />
      </BrowserRouter>
    );

    // Check if the form fields and submit button are rendered
    const createEvent = screen.getByText(/Crear Evento/i);
    fireEvent.click(createEvent);
    expect(screen.getByLabelText(/Nombre del Evento/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Descripción del evento/i)
    ).toBeInTheDocument();
  });

  it("disables the submit button when the form is invalid", () => {
    render(
      <BrowserRouter>
        <Eventos />
      </BrowserRouter>
    );

    const createEvent = screen.getByText(/Crear Evento/i);
    fireEvent.click(createEvent);

    const submitButton = screen.getByTestId(/crear-evento/i);
    expect(submitButton).toBeDisabled();
  });

  it("enables the submit button when all fields are valid", async () => {
    render(
      <BrowserRouter>
        <Eventos />
      </BrowserRouter>
    );

    const createEvent = screen.getByText(/Crear Evento/i);
    fireEvent.click(createEvent);

    fireEvent.change(screen.getByLabelText(/Nombre del Evento/i), {
      target: { value: "Evento 1" },
    });
    fireEvent.change(screen.getByLabelText(/Descripción del evento/i), {
      target: { value: "Descripción del evento" },
    });

    const submitButton = screen.getByTestId(/crear-evento/i);
    expect(submitButton).toBeEnabled();
  });

  it("show a fails message when registration fails", async () => {
    render(
      <BrowserRouter>
        <Eventos />
      </BrowserRouter>
    );

    const createEvent = screen.getByText(/Crear Evento/i);
    fireEvent.click(createEvent);

    fireEvent.change(screen.getByLabelText(/Nombre del Evento/i), {
      target: { value: "Evento 1" },
    });
    fireEvent.change(screen.getByLabelText(/Descripción del evento/i), {
      target: { value: "Descripción del evento" },
    });

    const submitButton = screen.getByTestId(/crear-evento/i);
    fireEvent.click(submitButton);

    // Wait for success message to appear in the DOM
    await waitFor(() => {
      expect(screen.getByText(/Ocurrio un error al registrar el evento/i));
    });
  });
});

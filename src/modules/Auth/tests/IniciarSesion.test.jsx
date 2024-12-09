import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import IniciarSesion from "../IniciarSesion";
import { BrowserRouter } from "react-router-dom";
import { SessionContext } from "@/context/SessionContext.jsx";

describe("Iniciar sesion", () => {
  it("renders the form correctly", () => {
    const mockSetUserSession = vi.fn();
    render(
      <SessionContext.Provider value={{ setUserSession: mockSetUserSession }}>
        <BrowserRouter>
          <IniciarSesion />
        </BrowserRouter>
      </SessionContext.Provider>
    );

    // check if the form and submit button are rendered
    expect(screen.getByLabelText(/Número de documento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument();
  });

  it("disables the button when the form is invalid", () => {
    const mockSetUserSession = vi.fn();
    render(
      <SessionContext.Provider value={{ setUserSession: mockSetUserSession }}>
        <BrowserRouter>
          <IniciarSesion />
        </BrowserRouter>
      </SessionContext.Provider>
    );

    const submitButton = screen.getByText(/Iniciar sesión/i);
    expect(submitButton).toBeDisabled();
  });

  it("enables the submit button when all fields are valid", () => {
    render(
      <SessionContext.Provider value={{ setUserSession: vi.fn() }}>
        <BrowserRouter>
          <IniciarSesion />
        </BrowserRouter>
      </SessionContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/Número de documento/i), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "Contrasea123." },
    });

    const submitButton = screen.getByText(/Iniciar sesión/i);

    expect(submitButton).toBeEnabled();
  });

  it("calls setUserSession when the form is submitted and shows success message", async () => {
    render(
      <SessionContext.Provider value={{ setUserSession: vi.fn() }}>
        <BrowserRouter>
          <IniciarSesion />
        </BrowserRouter>
      </SessionContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/Número de documento/i), {
      target: { value: "5642037" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "Hola.12345" },
    });

    const submitButton = screen.getByText(/Iniciar sesión/i);
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.getByText(/Inicio exitoso/i)).toBeInTheDocument()
    );
  });
});

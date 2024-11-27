import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import IniciarSesion from "./IniciarSesion";
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
});

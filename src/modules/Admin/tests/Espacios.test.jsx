import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import ModalEspacios from "../coordinador/espacios/ModalEspacios.jsx";

vi.mock("../hooks/useRegister", () => ({
  _esModule: true,
  default: vi.fn(() => ({
    register: vi.fn(),
    error: null,
  })),
}));

describe("Espacios", () => {
  it("renders the form correctly", () => {
    render(
      <BrowserRouter>
        <ModalEspacios />
      </BrowserRouter>
    );

    const modalOpen = screen.getByText(/Nuevo Espacio/i);
    fireEvent.click(modalOpen);

    expect(
      screen.getByLabelText(/Ingrese el nombre del espacio/i)
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/Ingrese la capacidad/i)).toBeInTheDocument();

    expect(
      screen.getByText(/Seleccione el tipo de espacio/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Seleccione el estado del espacio/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Ingrese las observaciones/i)
    ).toBeInTheDocument();
  });

  it("shows the success message when registration is successful", async () => {
    render(
      <BrowserRouter>
        <ModalEspacios />
      </BrowserRouter>
    );

    const modalOpen = screen.getByText(/Nuevo Espacio/i);
    fireEvent.click(modalOpen);

    fireEvent.change(screen.getByLabelText(/Ingrese el nombre del espacio/i), {
      target: { value: "Aula 101" },
    });
    fireEvent.change(screen.getByLabelText(/Ingrese la capacidad/i), {
      target: { value: 50 },
    });
   
    fireEvent.change(screen.getByTestId("tipo-espacio"), {
      target: { value: "aula" },
    })

    fireEvent.change(screen.getByTestId("estado-espacio"), {
      target: { value: "activo" },
    })

    fireEvent.change(screen.getByLabelText(/Ingrese las observaciones/i), {
      target: { value: "Espacio funcional" },
    });

    const submitButton = screen.getByText(/Crear espacio/i);
    fireEvent.click(submitButton);

    // Wait for success message to appear in the DOM
    await waitFor(() => {
      expect(
        screen.getByText(/Espacio registrado con exito!/i)
      ).toBeInTheDocument();
    });
  });
});

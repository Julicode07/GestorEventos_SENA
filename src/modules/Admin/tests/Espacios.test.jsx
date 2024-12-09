import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import ModalEspacios from "../coordinador/espacios/ModalEspacios.jsx";

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
});

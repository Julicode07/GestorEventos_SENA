import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Registrarse from "../Registrarse"; // Adjust the path if necessary
import { BrowserRouter } from "react-router-dom";

// Mock successful response
vi.mock("../hooks/useRegister", () => ({
  __esModule: true, // Marca el mock como módulo ES
  // default: vi.fn(() => ({
  //   register: vi.fn(() =>
  //     Promise.reject(new Error("Error al registrar el usuario"))
  //   ),
  //   error: "Error al registrar el usuario", // O cualquier valor que desees
  // })),
  default: vi.fn(() => ({
    register: vi.fn(),
    error: null,
  })),
}));

describe("Registrarse", () => {
  it("renders the form correctly", () => {
    render(
      <BrowserRouter>
        <Registrarse />
      </BrowserRouter>
    );

    // Check if the form fields and submit button are rendered
    expect(screen.getByLabelText(/Rol de cuenta/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Documento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombres/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Apellidos/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByText(/Crear cuenta/i)).toBeInTheDocument();
  });

  it("disables the button when the form is invalid", () => {
    render(
      <BrowserRouter>
        <Registrarse />
      </BrowserRouter>
    );

    const submitButton = screen.getByText(/Crear cuenta/i);
    expect(submitButton).toBeDisabled(); // The button should be disabled by default
  });

  it("enables the submit button when all fields are valid", () => {
    render(
      <BrowserRouter>
        <Registrarse />
      </BrowserRouter>
    );

    // Simulate valid form input
    fireEvent.change(screen.getByLabelText(/Documento/i), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByLabelText(/Nombres/i), {
      target: { value: "Juan" },
    });
    fireEvent.change(screen.getByLabelText(/Apellidos/i), {
      target: { value: "Pérez" },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: "juan.perez@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "Contraseña123." },
    });

    const submitButton = screen.getByText(/Crear cuenta/i);
    expect(submitButton).toBeEnabled(); // Button should be enabled now
  });

  // it("shows the success message when registration is successful", async () => {
  //   render(
  //     <BrowserRouter>
  //       <Registrarse />
  //     </BrowserRouter>
  //   );

  //   // Fill out the form with data
  //   fireEvent.change(screen.getByLabelText(/Rol de cuenta/i), {
  //     target: { value: "Coordinador" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Documento/i), {
  //     target: { value: "034474392" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Nombres/i), {
  //     target: { value: "Davi5d" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Apellidos/i), {
  //     target: { value: "Pérjhjhez" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
  //     target: { value: "dav5ifdfd.perez@example.com" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Teléfono/i), {
  //     target: { value: "12345678950" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Contraseña/i), {
  //     target: { value: "Hola.12345" },
  //   });

  //   // Simulate clicking the submit button
  //   const submitButton = screen.getByText(/Crear cuenta/i);
  //   fireEvent.click(submitButton);

  //   // Wait for success message to appear in the DOM
  //   await waitFor(() =>
  //     expect(
  //       screen.getByText(/Usuario registrado correctamente!/i)
  //     ).toBeInTheDocument()
  //   );
  // });

  // it("muestra un mensaje de error cuando el registro falla", async () => {
  //   render(
  //     <BrowserRouter>
  //       <Registrarse />
  //     </BrowserRouter>
  //   );

  //   // Simula un registro fallido
  //   fireEvent.change(screen.getByLabelText(/Rol de cuenta/i), {
  //     target: { value: "Instructor" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Documento/i), {
  //     target: { value: "12345678" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Nombres/i), {
  //     target: { value: "Juan" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Apellidos/i), {
  //     target: { value: "Pérez" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
  //     target: { value: "juan.perez@example.com" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Teléfono/i), {
  //     target: { value: "1234567890" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Contraseña/i), {
  //     target: { value: "Contraseña123." },
  //   });

  //   // Simulate clicking the submit button
  //   const submitButton = screen.getByText(/Crear cuenta/i);
  //   fireEvent.click(submitButton);

  //   // Wait for success message to appear in the DOM
  //   await waitFor(() =>
  //     expect(
  //       screen.getByText(/Error al registrar el usuario/i)
  //     ).toBeInTheDocument()
  //   );
  // });
});

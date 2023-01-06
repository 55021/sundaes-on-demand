import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const renderWithContext = (ui, options) => {
    return render(ui, { wrapper: OrderDetailsProvider, ...options });
};

// Re-exportar tudo
export * from "@testing-library/react";

// Sobrescrever o método render
export { renderWithContext as render };
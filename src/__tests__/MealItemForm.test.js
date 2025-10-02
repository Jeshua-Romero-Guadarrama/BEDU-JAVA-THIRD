// Autor: Jeshua Romero Guadarrama
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MealItemForm from "../components/Meals/MealItemForm";

test("MealItemForm valida el rango permitido", async () => {
  const user = userEvent.setup();
  const onAdd = jest.fn();
  render(<MealItemForm id="test" onAddToCart={onAdd} />);

  const input = screen.getByLabelText("Cantidad");
  await user.clear(input);
  await user.type(input, "0");
  await user.click(screen.getByRole("button", { name: /agregar/i }));

  expect(onAdd).not.toHaveBeenCalled();
  expect(screen.getByText(/Elige de 1 a 5 por pedido/i)).toBeInTheDocument();

  await user.clear(input);
  await user.type(input, "3");
  await user.click(screen.getByRole("button", { name: /agregar/i }));

  expect(onAdd).toHaveBeenCalledWith(3);
});

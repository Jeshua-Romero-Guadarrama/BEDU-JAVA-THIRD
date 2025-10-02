// Autor: Jeshua Romero Guadarrama
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import CartProvider from "../context/CartProvider";
import CartContext from "../context/CartContext";

function Harness() {
  const cart = useContext(CartContext);
  return (
    <div>
      <span data-testid="items-count">{cart.items.reduce((sum, item) => sum + item.amount, 0)}</span>
      <span data-testid="total-amount">{cart.totalAmount.toFixed(2)}</span>
      <button
        type="button"
        onClick={() => cart.addItem({ id: "m1", name: "Test", price: 10, amount: 2 })}
      >
        add
      </button>
      <button type="button" onClick={() => cart.removeItem("m1")}>remove</button>
      <button type="button" onClick={cart.clearCart}>clear</button>
    </div>
  );
}

test("CartProvider actualiza los totales al agregar y eliminar", async () => {
  const user = userEvent.setup();
  render(
    <CartProvider>
      <Harness />
    </CartProvider>
  );

  expect(screen.getByTestId("items-count").textContent).toBe("0");
  expect(screen.getByTestId("total-amount").textContent).toBe("0.00");

  await user.click(screen.getByText("add"));
  expect(screen.getByTestId("items-count").textContent).toBe("2");
  expect(screen.getByTestId("total-amount").textContent).toBe("20.00");

  await user.click(screen.getByText("remove"));
  expect(screen.getByTestId("items-count").textContent).toBe("1");
  expect(screen.getByTestId("total-amount").textContent).toBe("10.00");

  await user.click(screen.getByText("clear"));
  expect(screen.getByTestId("items-count").textContent).toBe("0");
  expect(screen.getByTestId("total-amount").textContent).toBe("0.00");
});

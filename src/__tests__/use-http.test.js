// Autor: Jeshua Romero Guadarrama
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useHttp from "../hooks/use-http";

function HookHarness({ transform }) {
  const { data, status, error, sendRequest } = useHttp();

  const loadHandler = () => {
    sendRequest({ url: "https://example.com" }, transform).catch(() => {});
  };

  return (
    <div>
      <p>status: {status}</p>
      <p>data: {Array.isArray(data) ? data.join(",") : data ?? "-"}</p>
      <p>error: {error ?? "-"}</p>
      <button type="button" onClick={loadHandler}>
        load
      </button>
    </div>
  );
}

afterEach(() => {
  jest.resetAllMocks();
});

test("useHttp resuelve datos correctamente", async () => {
  const user = userEvent.setup();
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ value: [1, 2, 3] }),
  });

  render(<HookHarness transform={(data) => data.value} />);

  await user.click(screen.getByText("load"));

  expect(await screen.findByText(/status: completed/i)).toBeInTheDocument();
  expect(screen.getByText(/data: 1,2,3/i)).toBeInTheDocument();
  expect(screen.getByText(/error: -/i)).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith("https://example.com", {
    method: "GET",
    headers: {},
    body: null,
  });
});

test("useHttp captura errores de red", async () => {
  const user = userEvent.setup();
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 500,
  });

  render(<HookHarness transform={(data) => data} />);

  await user.click(screen.getByText("load"));

  expect(await screen.findByText(/error: Error HTTP 500/i)).toBeInTheDocument();
});

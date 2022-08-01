import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { rest } from "msw";
import { setupServer } from "msw/node";
const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/todos/1", (req, res, ctx) => {
    return res(
      ctx.json({
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
      })
    );
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
test("renders learn react link", async () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  const title = await waitFor(() => screen.getByText("delectus aut autem"));
  expect(linkElement).toBeInTheDocument();
  expect(title).toBeInTheDocument();
});

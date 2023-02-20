import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProgressBar from "../components/UI/ProgressBar";
import { Provider } from "react-redux";
import { store } from "../app/store";

describe("ProgressBar component", () => {
  it("renders the component properly", () => {
    render(
      <Provider store={store}>
        <ProgressBar />
      </Provider>
    );
  });

  it("sets game status to off when time is up", () => {
    render(
      <Provider store={store}>
        <ProgressBar />
      </Provider>
    );
    jest.useFakeTimers();
    expect(store.getState().session.status).toBe("off");
  });
});

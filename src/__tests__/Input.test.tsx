import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "../components/UI/Input";

describe("Input component", () => {
  it("renders the component properly", () => {
    render(<Input />);
  });

  it("displays input placeholder when placeholder prop is passed in", () => {
    const placeholder = "This is a placeholder";
    render(<Input placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("calls the onChange function when change is detected", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const inputValue = screen.getByRole("textbox");
    fireEvent.change(inputValue, { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalled();
  });
});

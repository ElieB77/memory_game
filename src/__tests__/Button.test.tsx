import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../components/UI/Button";

describe("Button component", () => {
  it("renders the component properly", () => {
    render(<Button />);
  });

  it("display button's content when content prop is passed in", () => {
    const content = "Click";
    render(<Button content={content} />);
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it("calls the onClick function when button is clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });
});

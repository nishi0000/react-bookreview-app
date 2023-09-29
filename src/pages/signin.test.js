import { render, screen } from "@testing-library/react";
import SignIn from "./SignIn";

  test("入力フォーム（input要素）が存在する", () => {
    render(<SignIn />);
    const element = screen.getByRole('textbox');
    expect(element).toBeInTheDocument();
  });

  test("ラベル（label要素）が存在する", () => {
    render(<SignIn />);
    const element = screen.getByRole('label');
    expect(element).toBeInTheDocument();
  });

  test("ボタン（button要素）が存在する", () => {
    render(<SignIn />);
    const element = screen.getByRole('button');
    expect(element).toBeInTheDocument();
  });

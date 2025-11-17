import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubjectCard from ".";
import { SubjectCardProps } from "./types";

const subjectCardProps: SubjectCardProps = {
    id: "1",
    title: "Mathematics",
    icon: "FaCalculator",
    progress: 75,
    color: "yellow",
    onClick: jest.fn(),
  };

describe("SubjectCard", () => {
  it("renders the title and progress correctly", () => {
    render(<SubjectCard {...subjectCardProps} />);
    expect(screen.getByText(subjectCardProps.title)).toBeInTheDocument();
    expect(screen.getByText(subjectCardProps.progress + "%")).toBeInTheDocument();
  });

  it("shows 'No upcoming tasks' and a dash when there is no nextDelivery", () => {
    render(<SubjectCard {...subjectCardProps} />);
    expect(screen.getByText("No upcoming tasks")).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("shows correct delivery info when nextDelivery is provided", () => {
    const propsWithDelivery: SubjectCardProps = {
      ...subjectCardProps,
      nextDelivery: {
        title: "Algebra Homework",
        dueDate: "2025-11-20",
        daysLeft: 3,
      },
    };
    render(<SubjectCard {...propsWithDelivery} />);
    expect(screen.getByText(propsWithDelivery.nextDelivery!.title)).toBeInTheDocument();
    expect(screen.getByText("Due in 3 days")).toBeInTheDocument();
  });

  it("shows 'Due today!' when daysLeft is 0", () => {
    const propsDueToday: SubjectCardProps = {
      ...subjectCardProps,
      nextDelivery: {
        title: "Exam",
        dueDate: "2025-11-12",
        daysLeft: 0,
      },
    };
    render(<SubjectCard {...propsDueToday} />);
    expect(screen.getByText("Due today!")).toBeInTheDocument();
  });

  it("calls onClick when the card is clicked", () => {
    const handleClick = jest.fn();
    render(<SubjectCard {...subjectCardProps} onClick={handleClick} />);
    const card = screen.getByRole("button", { hidden: true });
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubjectCard from ".";
import { SubjectCardProps } from "./types";
import { SubjectIconEnum, SubjectColorEnum } from "@/services/subjects/enums";

const subjectCardProps: SubjectCardProps = {
  id: "1",
  title: "Mathematics",
  icon: SubjectIconEnum.CALCULATOR,
  progress: 75,
  color: SubjectColorEnum.YELLOW,
  onClick: jest.fn(),
};

describe("SubjectCard", () => {
  it("renders the title and progress correctly", () => {
    render(<SubjectCard {...subjectCardProps} />);
    expect(screen.getByText(subjectCardProps.title!)).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("shows 'No upcoming tasks' when there is no nextDelivery", () => {
    render(<SubjectCard {...subjectCardProps} />);
    expect(screen.getByText("No upcoming tasks")).toBeInTheDocument();
  });

  it("shows correct delivery info when nextDelivery is provided", () => {
    const propsWithDelivery: SubjectCardProps = {
      ...subjectCardProps,
      nextDelivery: {
        title: ["Algebra Homework", "Quiz"],
        daysLeft: 3,
      },
    };
    render(<SubjectCard {...propsWithDelivery} />);
    expect(screen.getByText("Algebra Homework")).toBeInTheDocument();
    expect(screen.getByText("Due in 3 days")).toBeInTheDocument();
  });

  it("shows 'Due today!' when daysLeft is 0", () => {
    const propsDueToday: SubjectCardProps = {
      ...subjectCardProps,
      nextDelivery: {
        title: ["Exam"],
        daysLeft: 0,
      },
    };
    render(<SubjectCard {...propsDueToday} />);
    expect(screen.getByText("Due today!")).toBeInTheDocument();
  });

  it("calls onClick when the card is clicked", () => {
    const handleClick = jest.fn();
    render(<SubjectCard {...subjectCardProps} onClick={handleClick} />);
    const card = screen.getByRole("button");
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders loading state correctly", () => {
    render(<SubjectCard {...subjectCardProps} loading={true} />);
    expect(screen.queryByText(subjectCardProps.title!)).not.toBeInTheDocument();
  });

  it("shows ellipsis when there are more than 3 tasks", () => {
    const propsWithManyTasks: SubjectCardProps = {
      ...subjectCardProps,
      nextDelivery: {
        title: ["Task 1", "Task 2", "Task 3", "Task 4"],
        daysLeft: 5,
      },
    };
    render(<SubjectCard {...propsWithManyTasks} />);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
    expect(screen.queryByText("Task 4")).not.toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
  });
});

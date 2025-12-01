import { SubjectColorEnum, SubjectIconEnum } from "@/services/subjects/enums";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ReminderCard from ".";

describe("ReminderCard", () => {
  it("renders title correctly", () => {
    render(
      <ReminderCard
        title="Upcoming Tasks"
        events={[]}
      />
    );
    expect(screen.getByText("Upcoming Tasks")).toBeInTheDocument();
  });

  it("renders empty list when no events provided", () => {
    const { container } = render(
      <ReminderCard
        title="Upcoming Tasks"
        events={[]}
      />
    );
    const listItems = container.querySelectorAll("li");
    expect(listItems).toHaveLength(0);
  });

  it("renders events with name and dateTime", () => {
    const events = [
      {
        name: "Math Exam",
        dateTime: "2025-12-20 14:00",
        icon: SubjectIconEnum.CALCULATOR,
        dotColor: SubjectColorEnum.BLUE,
      },
      {
        name: "English Essay",
        dateTime: "2025-12-21 10:00",
        icon: SubjectIconEnum.BOOK,
        dotColor: SubjectColorEnum.RED,
      },
    ];

    render(
      <ReminderCard
        title="Upcoming Tasks"
        events={events}
      />
    );

    expect(screen.getByText("Math Exam")).toBeInTheDocument();
    expect(screen.getByText("English Essay")).toBeInTheDocument();
    expect(screen.getByText("2025-12-20 14:00")).toBeInTheDocument();
    expect(screen.getByText("2025-12-21 10:00")).toBeInTheDocument();
  });

  it("renders event without icon when icon is undefined", () => {
    const events = [
      {
        name: "Study Session",
        dateTime: "2025-12-22 15:00",
        dotColor: SubjectColorEnum.BLUE,
      },
    ];

    render(
      <ReminderCard
        title="Reminders"
        events={events}
      />
    );

    expect(screen.getByText("Study Session")).toBeInTheDocument();
    expect(screen.getByText("2025-12-22 15:00")).toBeInTheDocument();
  });

  it("renders multiple events in a list", () => {
    const events = [
      {
        name: "Event 1",
        dateTime: "2025-12-20",
        icon: SubjectIconEnum.BOOK,
        dotColor: SubjectColorEnum.BLUE,
      },
      {
        name: "Event 2",
        dateTime: "2025-12-21",
        icon: SubjectIconEnum.CALCULATOR,
        dotColor: SubjectColorEnum.GREEN,
      },
      {
        name: "Event 3",
        dateTime: "2025-12-22",
        icon: SubjectIconEnum.FLASK,
        dotColor: SubjectColorEnum.YELLOW,
      },
    ];

    const { container } = render(
      <ReminderCard
        title="Events"
        events={events}
      />
    );

    const listItems = container.querySelectorAll("li");
    expect(listItems).toHaveLength(3);
  });

  it("applies correct styling to event list", () => {
    const { container } = render(
      <ReminderCard
        title="Upcoming Tasks"
        events={[
          {
            name: "Task 1",
            dateTime: "2025-12-20",
            icon: SubjectIconEnum.BOOK,
            dotColor: SubjectColorEnum.BLUE,
          },
        ]}
      />
    );

    const list = container.querySelector("ul");
    expect(list).toHaveClass("max-h-48");
    expect(list).toHaveClass("overflow-y-auto");
  });
});

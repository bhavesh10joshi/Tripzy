export const groupEventsByDay = (events: any[]) => {
  const grouped: Record<string, any[]> = {};

  events.forEach((event) => {
    const match = event.Time.match(/Day (\d+)/);

    if (!match) return;

    const day = match[1];

    if (!grouped[day]) {
      grouped[day] = [];
    }

    grouped[day].push(event);
  });

  return Object.keys(grouped).map((day) => ({
    Day: Number(day),
    Events: grouped[day]
  }));
};
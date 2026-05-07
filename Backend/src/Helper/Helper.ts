export const groupEventsByDay = (events: any[]) => {
  const grouped: Record<string, any[]> = {};

  events.forEach((event) => {
    let day = event.Day;

    if (!day && event.Time) {
      const match = event.Time.match(/Day (\d+)/);
      if (match) {
        day = match[1];
      }
    }

    if (!day) return;

    if (!grouped[day]) {
      grouped[day] = [];
    }

    grouped[day]?.push(event);
  });

  return Object.keys(grouped)
    .sort((a, b) => Number(a) - Number(b))
    .map((day) => {
      const dayEvents = grouped[day];
      
      return {
        Day: Number(day),
        Nameoftheday: dayEvents?.[0]?.Nameoftheday || `Day ${day}`,
        DayDate: dayEvents?.[0]?.DayDate || "",
        Events: dayEvents || []
      };
    });
};
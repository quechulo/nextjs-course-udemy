export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-course-bde02-default-rtdb.europe-west1.firebasedatabase.app/events.json"
  );
  const data = await response.json();
 const allEvents = [];
  for (const key in data) {
    allEvents.push({
      id: key,
      ...data[key]
    });
  }
  return allEvents;
}

export async function getFeaturedEvents() {
    const featEvents = await getAllEvents();
    return featEvents.filter(event => event.isFeatured);
}

export async function getEventById(id) {
    const events = await getAllEvents();

    return events.find(event => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    const events = await getAllEvents();
  
    let filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
    return filteredEvents;
}
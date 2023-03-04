import EventList from "../../components/event-list";
import { getFeaturedEvents } from "../../dummy-data";

function Events() {
    const featuredEvents = getFeaturedEvents();

    return (
        <div>
            <h3>Welcome to the EventsPage</h3>
            <EventList items={featuredEvents} />
        </div>
    )
}

export default Events;
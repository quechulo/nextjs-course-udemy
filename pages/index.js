import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";
import EventsSearch from "../components/events/events-search";
import { Fragment } from "react";
import { useRouter } from "next/router";

function HomePage() {
  const featuredEvents = getFeaturedEvents();
  const router = useRouter();
  const searchHandler = (selectedYear, selectedMonth) => {
    const fullPath = `/events/${selectedYear}/${selectedMonth}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={searchHandler} />
      <EventList items={featuredEvents} />
    </Fragment>
  );
}

export default HomePage;

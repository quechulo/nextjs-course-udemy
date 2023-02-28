import Link from "next/link";

function ClientsPage() {
  const clients = [
    { id: "Mike", projects: ["1", "2", "3"] },
    { id: "Emanuel", projects: ["1", "2", "3"] },
  ];
  return (
    <div>
      <h1>Clients Page</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link
              href={{
                pathname: "/clients/[id]",
                query: { id: client.id },
              }}
            >
              {client.id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientsPage;

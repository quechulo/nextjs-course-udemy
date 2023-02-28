import { useRouter } from "next/router";

function ClientProjectsPage() {
    const router = useRouter();
    const loadProjectHandler = () => {
      //load data...
      // router.push('/clients/mike/projecta');
      router.push({
        pathname: '/clients/[id]/[clientprojectid]',
        query: { id: 'mike', clientprojectid: 'projecta' },
      });
    }

  return (
    <div>
      <h1>The projects of a Client {router.query.id}</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientProjectsPage;

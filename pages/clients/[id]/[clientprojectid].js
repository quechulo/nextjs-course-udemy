import { useRouter } from "next/router";

function SelectedClientProjectPage() {
    const router = useRouter();
    console.log(router.query)
    return (
      <div>
        <h1>The project {router.query.clientprojectid} of a Client {router.query.id}</h1>
      </div>
    );
  }
  
  export default SelectedClientProjectPage;
function UserIdPage(props) {
  return <h1>Specific User Page {props.id}</h1>;
}

export default UserIdPage;

export async function getServerSideProps(context) {
    const { params } = context;

    const userId = params.uid;

    return {
        props: {
          id: "userid-" + userId,
        },
      };
}
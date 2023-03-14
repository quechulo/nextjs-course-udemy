function UserProfilePage(props) {
  return <div>{props.username}</div>;
}

export default UserProfilePage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  console.log('Server Side code');

  return {
    props: {
      username: "Mike",
    },
  };
}

import { getSession } from "next-auth/react";

export default function Index({ user }) {
  return (
    <div className="text-center mt-5">
      <h1 className="text-center mb-5">Welcome to Auth System</h1>
      <h4>{user.name}</h4>
      <p>{user.email}</p>
    </div>
  );
};

export async function getServerSideProps({req}) {
  const session = await getSession({ req });
  if(!session) {
    return {
      redirect: {
        destination: '/authentication',
        permeanent: false
      }
    };
  };
  const data = {
    name: session.user.name,
    email: session.user.email
  }
  return {
    props: {
      session,
      user: data
    }
  };
};
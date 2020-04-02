import React, { useEffect } from "react";
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";

const Books = () => {
  const { loading, user } = useAuth0();

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div className="container mb-5">
      <div className="row align-items-center profile-header mb-5 text-center text-md-left">
        <p>hello {user.nickname}</p>
      </div>
    </div>
  );
};

export default Books;

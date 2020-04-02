import React, { useEffect } from "react";
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";

const Profile = () => {
  const { loading, user, getTokenSilently } = useAuth0();

  useEffect(() => {
    // const getToken = async () => {
    //   let token = await getIdTokenClaims();
    //   console.log(token)`

    //   const test = fetch
    // };

    // const getToken = async () => {
    //   const token = await getTokenSilently();

    //   const response = await fetch("https://localhost:44350/books/1", {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    //   const responseData = await response.json();

    //   console.log(responseData);
    // };

    // getToken();
    console.log(user);
  }, [user]);

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div className="container mb-5">
      <div className="row align-items-center profile-header mb-5 text-center text-md-left">
        <div className="col-md-2">
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
        <div className="col-md-2">
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

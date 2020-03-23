import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";

const Profile = () => {
  const { loading, user, getTokenSilently } = useAuth0();

  useEffect(() => {
    // const getToken = async () => {
    //   let token = await getIdTokenClaims();
    //   console.log(token)

    //   const test = fetch
    // };

    const getToken = async () => {
      const token = await getTokenSilently();

      const response = await fetch("https://localhost:44350/books/1", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const responseData = await response.json();

      console.log(responseData)

    }

    getToken();
    console.log(user);
  }, [user]);

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>
    </Container>
  );
};

export default Profile;

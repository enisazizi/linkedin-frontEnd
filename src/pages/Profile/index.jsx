import React from "react";
import {
  Col,
  Row,
  Alert,
  Card,
  Dropdown,
  DropdownButton,
  Container,
  Button,
} from "react-bootstrap";
import { FadeLoader } from "react-spinners";
import Bio from "../../components/BioCard";
import Experience from "../../components/Experience";
import Feature from "../../components/Featured";
import Sidebar from "../../components/Sidebar";
import EditProfile from "../../components/EditProfile";
import "./styles.css";
import { BiPencil, BiDotsHorizontalRounded } from "react-icons/bi";
import { Route } from "react-router-dom";
class Body extends React.Component {
  state = {
    profile: {},
    showAlert: null,
    err: false,
    errType: null,
    errMsg: "",
    loading: true,
    myquery: this.props.query,
  };
  searchProfile = (id) => {
    let userId = "";
    this.props.match.params.id === "me" ||
    this.props.location.pathname === "/user/me"
      ? (userId = localStorage.getItem("id"))
      : (userId = id);
    fetch(`${process.env.REACT_APP_API_URL}/profiles/${userId}`, {
      method: "GET",
      headers: new Headers({
        // Authorization: "Basic " + localStorage.getItem("token"),
        ContentType: "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((info) => {
        let profile = { ...info };
        console.log(profile);
        this.setState({ profile: profile, loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
          err: true,
          errType: "danger",
          errMsg: error.messasge,
        });
      });
  };
  componentDidMount = () => {
    this.props.match.params.id &&
      this.searchProfile(this.props.match.params.id);
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.searchProfile(this.props.match.params.id);
    }
  };
  render() {
    const { err, loading, profile, errMsg } = this.state;
    return (
      <div className="bgBody">
        <Container className="mainBody">
          {err && <Alert variant="danger">{errMsg}</Alert>}
          {loading && err === true ? (
            <FadeLoader loading={loading} size={60} />
          ) : profile.length !== 0 ? (
            <Row>
              <Col lg={9}>
                <Card className="cardProf mt-0">
                  <Card.Img
                    className="cardImg"
                    variant="top"
                    src="https://coverfiles.alphacoders.com/372/37275.jpg"
                    style={{ objectFit: "cover" }}
                    alt="placeholder"
                  />
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <div style={{ marginTop: "-130px" }}>
                        <img
                          src={profile.image}
                          alt="placeholder"
                          height="160px"
                          width="160px"
                          style={{
                            borderRadius: "50%",
                            border: "4px solid white",
                            objectFit: "cover",
                          }}
                        ></img>
                      </div>
                    </div>
                    <Row>
                      <Col lg={6} className="pl-4">
                        <div className="usrnTxt">
                          {profile.name + " " + profile.surname}
                        </div>
                        <div className="roletext">{profile.title}</div>
                        <div className="areaTxt">{profile.area}</div>
                        <Route path="/user/me">
                          <Row className="mx-0">
                            <DropdownButton
                              className="d-block"
                              id="dropdown-basic-button"
                              size="sm"
                              title="Add profile section"
                            >
                              <Dropdown.Item>Intro</Dropdown.Item>
                              <Dropdown.Item>About</Dropdown.Item>
                              <Dropdown.Item>Featured</Dropdown.Item>
                              <Dropdown.Item>Background</Dropdown.Item>
                              <Dropdown.Item>Skills</Dropdown.Item>
                              <Dropdown.Item>Accomplishments</Dropdown.Item>
                              <Dropdown.Item>
                                Additional information
                              </Dropdown.Item>
                              <Dropdown.Item>Supported languages</Dropdown.Item>
                            </DropdownButton>
                            <Button
                              variant="outline-dark"
                              className="rounded-pill profileBtn mx-2"
                            >
                              More...
                            </Button>
                          </Row>
                        </Route>
                      </Col>
                      <Col lg={6} className="">
                        <Row className="flex-row-reverse">
                          <Route path="/user/me">
                            <EditProfile
                              profile={profile}
                              refetch={() =>
                                this.searchProfile(this.props.match.params.id)
                              }
                              color="#0A66CE"
                            />
                          </Route>
                          <Route path={new RegExp("[^/user/me]")}>
                            <BiDotsHorizontalRounded
                              size="36"
                              className="mr-2"
                            />
                            <Button
                              className="rounded-pill profileBtn mr-2"
                              variant="outline-dark"
                            >
                              Meessage
                            </Button>
                            <Button className="rounded-pill profileBtn mr-2">
                              Connect
                            </Button>
                          </Route>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Bio
                  bio={profile.bio}
                  profile={profile}
                  refetch={() => this.searchProfile(this.props.match.params.id)}
                />
                <Route path="/user/me">
                  <Feature />
                </Route>
                <Experience profile={profile} />
              </Col>
              <Col lg={3} className="d-none d-lg-block">
                <Sidebar />
              </Col>
            </Row>
          ) : (
            this.setState({
              err: true,
              errType: "warning",
              errMsg: "We have encounter a problem, the profile is empty",
            })
          )}
        </Container>
      </div>
    );
  }
}
export default Body;

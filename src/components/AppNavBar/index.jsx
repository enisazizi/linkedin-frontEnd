import React from "react";
import { Form, FormControl, Navbar, Nav, InputGroup } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import SearchResult from "../SearchResult";
import {
  FaLinkedin,
  FaSearch,
  FaHome,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import { BsPeopleFill, BsGrid3X3Gap, BsCollectionPlay } from "react-icons/bs";
import { GiHandBag } from "react-icons/gi";
import { RiMessage2Fill } from "react-icons/ri";
import "./styles.css";
class AppNavBar extends React.Component {
  state = {
    query: null,
    profiles: [],
  };

  handleSearchProfiles = (e) => {
    let currentId = e.currentTarget.id;
    this.setState({ profiles: [] });
    let query = e.currentTarget.value;
    if (e.currentTarget.value.length > 0) {
      // }else{
      this.setState({ query }, console.log(this.state));
      fetch(`${process.env.REACT_APP_API_URL}/profiles?name=${query}`, {
        method: "GET",
        headers: new Headers({
          Authorization: "Basic " + localStorage.getItem("token"),
          ContentType: "application/json",
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((info) => {
          let profiles = [...info];
          console.log(profiles);
          this.setState({ profiles: profiles });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  render() {
    const { query, profiles } = this.state;
    return (
      <>
        <Navbar bg="white" variant="light" className="py-0 fixed-top">
          <div className="navbarContent">
            <Navbar.Brand
              as={Link}
              to="/home"
              className="navbarBrand d-flex nowrap mr-2"
            >
              <IconContext.Provider
                value={{
                  size: "38px",
                  className: "linkedinIcon",
                  color: "#0a66c2",
                  title: "LinkedIn",
                }}
              >
                <FaLinkedin />
              </IconContext.Provider>
            </Navbar.Brand>
            <Form inline className="navSearch">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <IconContext.Provider
                      value={{
                        size: "15",
                        className: "SearchIcon",
                        color: "grey",
                        backgroundColor: "#60627c",
                      }}
                    >
                      <FaSearch />
                    </IconContext.Provider>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  value={this.props.query}
                  id="query"
                  type="text"
                  placeholder="Search"
                  onChange={this.handleSearchProfiles}
                />
              </InputGroup>
            </Form>

            <div className="ml-auto mr-0 d-flex row justify-content-end">
              <Nav.Link className="navLinkCol flex-column" as={Link} to="/Home">
                <FaHome className="navIcon" />
                <span className="navIconText">Home</span>
              </Nav.Link>
              <Nav.Link className="navLinkCol flex-column">
                <BsPeopleFill className="navIcon" />
                <span className="navIconText">My Network</span>
              </Nav.Link>
              <Nav.Link className="navLinkCol flex-column">
                <GiHandBag className="navIcon" />
                <span className="navIconText">Jobs</span>
              </Nav.Link>
              <Nav.Link className="navLinkCol flex-column">
                <RiMessage2Fill className="navIcon" />
                <span className="navIconText">Messaging</span>
              </Nav.Link>
              <Nav.Link className="navLinkCol flex-column">
                <FaBell className="navIcon" />
                <span className="navIconText">Notifications</span>
              </Nav.Link>
              <Nav.Link
                className="navLinkCol flex-column"
                as={Link}
                to="/user/me"
              >
                <FaUserCircle className="navIcon" />
                <span className="navIconText">Me</span>
              </Nav.Link>
              <div className="vl"></div>
              <Nav.Link className="navLinkCol flex-column">
                <BsGrid3X3Gap className="navIcon" />
                <span className="navIconText">Work</span>
              </Nav.Link>
              <Nav.Link className="navLinkCol flex-column">
                <BsCollectionPlay className="navIcon" />
                <span className="navIconText">Learning</span>
              </Nav.Link>
            </div>
          </div>
        </Navbar>
        {query !== 0 && <SearchResult profile={profiles} />}
      </>
    );
  }
}

export default withRouter(AppNavBar);

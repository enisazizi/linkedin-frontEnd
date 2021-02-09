import React from "react";
import "../../App.css";
import { Card, Row } from "react-bootstrap";
import EditProfile from "../EditProfile";
import "../../pages/Profile/styles.css";
import { Route } from "react-router-dom";

class Bio extends React.Component {
  render() {
    return (
      <Card className="cardProf">
        <Card.Body>
          <Row className="d-flex justify-content-between ml-1">
            <div className="info">About</div>

            <Route path="/user/me">
              <EditProfile
                profile={this.props.profile}
                refetch={this.props.refetch}
                color="#0A66CE"
              />
            </Route>
          </Row>
          <div className="infobody">{this.props.bio}</div>
        </Card.Body>
      </Card>
    );
  }
}
export default Bio;

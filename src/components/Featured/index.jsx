import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import feat1 from "../../assets/2.png";
import feat3 from "../../assets/3.png";

class Feature extends React.Component {
  render() {
    return (
      <>
        <Card
          className="bio cardProf"
          style={{ borderRadius: ".5vw", marginTop: ".8vw" }}
        >
          <Card.Header
            className="info"
            style={{
              backgroundColor: "white",
              borderStyle: "none",
              paddingBottom: 0,
            }}
          >
            Featured
          </Card.Header>
          <Card.Body
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              maxWidth: "800px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <img
              src={feat3}
              alt=""
              style={{
                height: "185px",
                objectFit: "cover",
                paddingRight: "1rem",
              }}
            />
            <img
              src={feat1}
              alt=""
              style={{
                height: "185px",
                objectFit: "cover",
                paddingRight: "1rem",
              }}
            />
          </Card.Body>
        </Card>
      </>
    );
  }
}
export default Feature;

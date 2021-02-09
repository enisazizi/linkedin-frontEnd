import React, { Component } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { ImEarth } from "react-icons/im";
import "./styles.css";
export default class index extends Component {
  render() {
    return (
      <Row className="postByInfo">
        <div className="d-flex flex-column-reverse">
          <Image
            src={this.props.me.image}
            roundedCircle
            className="postByAvatar"
          />
        </div>
        <Col>
          <Row className="ml-1">
            <strong>{this.props.me.name + " " + this.props.me.surname}</strong>
          </Row>
          <Button variant="outline-dark rounded-pill" className="viewByBtn">
            <Row className="d-flex align-content-center">
              <ImEarth className="viewByAnyoneEarth" /> Anyone
            </Row>
          </Button>
        </Col>
      </Row>
    );
  }
}

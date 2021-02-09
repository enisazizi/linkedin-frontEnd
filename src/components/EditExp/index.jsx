import React from "react";
// import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import "../../App.css";
import "../../pages/Profile/styles.css";
class Edit extends React.Component {
  state = {
    showModal: false,
    experience: {},
    selectedFile: null,
    imgSubmitStatus: "secondary",
  };
  url = `${process.env.REACT_APP_API_URL}/experiences`;
  headers = {
    Authorization: "Basic " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  };
  fetchExp = async () => {
    try {
      console.log("expid", this.props.expId);
      if (this.props.expId !== null) {
        const response = await fetch(
          `${this.url}/${this.props.profile.username}/experiences/${this.props.expId}`,
          {
            method: "GET",
            headers: this.headers,
          }
        );
        const data = await response.json();
        if (response.ok) {
          this.setState({ experience: data });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  onChangeHandler = (e) => {
    this.setState({
      experience: {
        ...this.state.experience,
        [e.target.id]: e.currentTarget.value,
      },
    });
  };
  submitData = async (str) => {
    const url =
      str === "POST"
        ? `${this.url}/${this.props.profile.username}`
        : `${this.url}/${this.props.profile.username}/experiences/${this.props.expId}`; //TODO careful when merging into profile route
    const payload = JSON.stringify(this.state.experience);
    try {
      console.log(payload, str, url);
      const response = await fetch(url, {
        method: str,
        headers: this.headers,
        body: payload,
      });
      if (response.ok) {
        if (this.state.selectedFile !== null) {
          this.fileUploadHandler();
        } else {
          this.props.toggle();
          this.props.refetch();
        }
      } else {
        console.log("submit failed");
      }
      // this.fetchExp();
    } catch (e) {
      console.log(e);
    }
  };
  actionBtn = (str) => {
    str !== "DELETE"
      ? this.submitData(this.isNewExp() ? "PUT" : "POST")
      : this.submitData("DELETE");
  };
  componentDidMount = () => {
    this.fetchExp();
  };
  componentDidUpdate(prevProps) {
    if (prevProps.expId !== this.props.expId) {
      if (this.isNewExp()) {
        this.fetchExp();
      } else {
        this.setState({ experience: { empty: true } });
      }
    }
  }
  isNewExp = () => {
    return this.props.expId !== null ? true : false;
  };
  fileSelectHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      imgSubmitStatus: "success",
    });
  };

  fileUploadHandler = async () => {
    const fd = new FormData();
    fd.append("image", this.state.selectedFile);
    try {
      const response = await fetch(
        //TODO prepare for userid username
        `${this.url}/${this.props.profile.username}/experiences/${this.props.expId}/upload`,
        {
          method: "POST",
          headers: { Authorization: "Basic " + localStorage.getItem("token") },
          body: fd,
        }
      );
      if (response.ok) {
        this.props.toggle();
        this.props.refetch();
      } else {
        this.props.toggle();
        this.props.refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { experience, imgSubmitStatus } = this.state;
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={this.props.toggle}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {this.isNewExp() ? "Edit" : "Add"} Experience
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Role * </Form.Label>
              <Form.Control
                required
                id="role"
                value={experience.role}
                type="text"
                size="sm"
                placeholder="Role"
                onChange={(e) => this.onChangeHandler(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company * </Form.Label>
              <Form.Control
                required
                id="company"
                value={experience.company}
                type="text"
                size="sm"
                placeholder="Company"
                onChange={(e) => this.onChangeHandler(e)}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Start date * </Form.Label>
                  <Form.Control
                    required
                    id="startDate"
                    value={experience.startDate}
                    type="date"
                    size="sm"
                    placeholder="Headline"
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>End date (empty if current) </Form.Label>
                  <Form.Control
                    value={experience.endDate}
                    id="endDate"
                    type="date"
                    size="sm"
                    placeholder="Current Position"
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Description * </Form.Label>
              <Form.Control
                required
                value={experience.description}
                id="description"
                as="textarea"
                size="sm"
                placeholder="Description"
                onChange={(e) => this.onChangeHandler(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Area * </Form.Label>
              <Form.Control
                required
                value={experience.area}
                id="area"
                type="text"
                size="sm"
                placeholder="Area"
                onChange={(e) => this.onChangeHandler(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {this.isNewExp() && (
            <Button
              className="rounded-pill py-1 mr-auto"
              variant="danger"
              onClick={() => this.actionBtn("DELETE")}
            >
              DELETE
            </Button>
          )}
          {/* <Button
            className="rounded-pill py-1"
            variant="secondary"
            onClick={this.props.toggle}
          >
            Close
          </Button> */}
          <input
            style={{ display: "none" }}
            type="file"
            onChange={this.fileSelectHandler}
            ref={(fileInput) => (this.fileInput = fileInput)}
          />
          <Button
            className="rounded-pill py-1"
            variant={imgSubmitStatus}
            onClick={() => this.fileInput.click()}
          >
            {imgSubmitStatus === "secondary"
              ? "Choose an image"
              : "Ready to Upload"}
          </Button>
          <Button
            className="rounded-pill py-1"
            variant="primary"
            onClick={() => this.actionBtn(this.isNewExp() ? "PUT" : "POST")}
          >
            {this.isNewExp() ? "Save Changes" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default Edit;

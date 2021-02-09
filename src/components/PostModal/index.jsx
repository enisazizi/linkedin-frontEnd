import React from "react";
import { Button, Col, Row, Modal, Form, Card } from "react-bootstrap";
import { MdInsertPhoto, MdVideocam, MdEventNote } from "react-icons/md";
import { RiArticleLine, RiBallPenFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { withRouter } from "react-router-dom";
import PostByInfo from "../../components/PostByInfo";
import "./styles.css";

class PostModal extends React.Component {
  state = {
    showModal: false,
    me: {},
    selectedFile: null,
    imgSubmitStatus: "secondary",
    post: {
      text: "",
    },
  };
  addHashtag = () => {
    this.setState({ post: { text: this.state.post.text + " #" } });
  };

  onChangeHandler = (e) => {
    this.setState({
      post: {
        ...this.state.post,
        [e.target.id]: e.currentTarget.value,
      },
    });
  };
  fileSelectHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      imgSubmitStatus: "success",
    });
  };
  fileUploadHandler = async (postId) => {
    const fd = new FormData();
    fd.append("post", this.state.selectedFile);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${postId}`,
        {
          method: "POST",
          body: fd,
        }
      );
      if (response.ok) {
        this.setState({ showModal: false }, () => this.props.refetch());
        console.log("posted with a image");
      } else {
        this.setState({ showModal: false });
      }
    } catch (error) {
      console.log(error);
    }
  };
  submitData = async () => {
    try {
      const payload = {
        ...this.state.post,
        username: this.props.me.username,
      };
      const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        this.fileUploadHandler(data._id);
        this.setState({ showModal: false }, () => this.props.refetch());
      } else {
        this.setState({ showModal: false });
      }
    } catch (e) {
      console.log(e);
    }
  };
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  render() {
    const { imgSubmitStatus, post, showModal } = this.state;
    return (
      <>
        <Card className="pt-3 px-3 pb-0 mb-2">
          <Button
            className="postButton align-items-center d-flex"
            variant="outline-secondary"
            onClick={() => this.toggleModal()}
          >
            <RiBallPenFill size="16" />
            <p>Start a Post</p>
          </Button>
          <Row className="my-3 justify-content-around align-items-center d-flex">
            <IconContext.Provider
              value={{
                size: "24",
              }}
            >
              <Row className="align-items-center d-flex">
                <MdInsertPhoto color="#70b5f9" />
                <p className="postBtnText">Photo</p>
              </Row>
              <Row className="align-items-center d-flex">
                <MdVideocam color="#7fc15e" />
                <p className="postBtnText">Video</p>
              </Row>
              <Row className="align-items-center d-flex">
                <MdEventNote color="#e7a33e" />
                <p className="postBtnText">Event</p>
              </Row>
              <Row className="align-items-center d-flex">
                <RiArticleLine color="#f5987e" />
                <p className="postBtnText">Write Article</p>
              </Row>
            </IconContext.Provider>
          </Row>
        </Card>

        <Modal show={showModal} onHide={() => this.toggleModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Create a Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PostByInfo me={this.props.me} />
            <Form className="mt-2">
              <Form.Group>
                <Form.Control
                  as="textarea"
                  id="text"
                  placeholder="What do you want to talk about?"
                  className="border-0"
                  rows={3}
                  value={post.text}
                  onChange={(e) => this.onChangeHandler(e)}
                />
              </Form.Group>
            </Form>
            <Row>
              <Col className="d-flex">
                <Button
                  variant="outline-primary"
                  className="HashButton"
                  onClick={this.addHashtag}
                >
                  Add hashtag
                </Button>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="justify-content-between">
            <input
              style={{ display: "none" }}
              type="file"
              onChange={this.fileSelectHandler}
              ref={(fileInput) => (this.fileInput = fileInput)}
            />
            <IconContext.Provider
              value={{
                size: "30px",
                className: "mx-2",
                color: imgSubmitStatus === "secondary" ? "#666" : "#28a745",
              }}
            >
              <MdVideocam onClick={() => this.fileInput.click()} />
            </IconContext.Provider>
            <Button
              variant="primary"
              className="rounded-pill"
              onClick={() => this.submitData()}
            >
              Post
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(PostModal);

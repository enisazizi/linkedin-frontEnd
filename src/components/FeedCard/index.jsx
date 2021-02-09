import React, { Component } from "react";
import {
  Button,
  Image,
  Card,
  Col,
  Row,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import {
  
  BiLike,
  BiCommentDetail,
  BiShare,
  BiSend,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import {
  AiFillLike,
} from "react-icons/ai"
import moment from "moment";
import "./styles.css";
export default class FeedCard extends Component {
  state = {
     showComment: false, 
     payload: {},
    liked:false,
   };

  //TODO callbacks
  commentRequest = async (method, id) => {
    try {
      console.log(this.props.meId,"allo")
      const url = `${process.env.REACT_APP_API_URL}/comments/${this.props.post._id}/${this.props.meId}`;
      const delUrl = `${process.env.REACT_APP_API_URL}/comments/${id}`;
      const res = await fetch(method === "POST" ? url : delUrl, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.payload),
      });
      if (res.ok) {
        console.log("ok");
        this.props.refetch();

      }
    } catch (error) {
      console.log(error);
    }
  };
  handleLikes =async (method,id) =>{
    try{
      if(method==="POST"){
        const likeMe = true
       
        this.setState({liked:likeMe})
      }else{
        const unlike= false
        this.setState({liked:unlike})
      }
    const liked =`${process.env.REACT_APP_API_URL}/posts/${this.props.post._id}/${this.props.meId}/like` 
    const dislike = `${process.env.REACT_APP_API_URL}/posts/${this.props.post._id}/${id}`
    const res = await fetch(method === "POST" ? liked : dislike, {
      method: method,
      headers: { "Content-Type": "application/json" },
    
    });
    if (res.ok) {
      console.log("ok");
      this.props.refetch();
    }
  } catch (error) {
    console.log(error);
  }
  }
  handleComment = () => {
    this.setState({ showComment: !this.state.showComment });
  };
  handleCommentInput = (e) => {
    e.preventDefault();
    this.setState({
      payload: {
        ...this.state.payload,
        [e.currentTarget.name]: e.currentTarget.value,
      },
    });
    console.log(this.state, e.key);
    if (e.keyCode === 13 || e.key === "Enter") {
      console.log("enter");
      this.commentRequest("POST");
    }
  };
  render() {
    const { post } = this.props;
    const { showComment, payload } = this.state;
    return (
      <div>
        <Card className="w-100 my-2 feedCard" key={`feed${post._id}`}>
          <Card.Header className="d-flex justify-content-between px-3">
            <Row className="ml-1">
              <Image
                src={post.user.image}
                className="feedcardAvatar mr-3 align-self-center"
                roundedCircle
              />
              <Col className="">
                <Row className="mb-0 feedcardName">
                  {post.user.name + " " + post.user.surname}
                </Row>
                <Row className="mb-0 feedcardInfo">{post.user.title}</Row>
                <Row className="mb-0 feedcardInfo">
                  {moment(post.createdAt).fromNow()}
                </Row>
              </Col>
            </Row>
            {/* TODO if user = me */}
            <div onClick={this.props.toggle} className="feedcardEditDotsDiv">
              <BiDotsHorizontalRounded className="feedcardEditDots" size="24" />
            </div>
          </Card.Header>
          {post.image && (
            <Card.Img
              src={post.image}
              alt="PostImage"
              className="feedcardImg"
            />
          )}
          <Card.Text className="p-3">{post.text}</Card.Text>
          <Card.Footer className="cardFooter bg-white">
            <Row>
              {this.state.liked ? (
                <Button variant="none" onClick={()=>this.handleLikes("POST")}>
                <AiFillLike size="24" style={{ transform: "scaleX(-1)" }} /> Like
              </Button>
              ):(
              <Button variant="none" onClick={()=>this.handleLikes("DELETE",)}>
                <BiLike size="24" style={{ transform: "scaleX(-1)" }} /> Like
              </Button>
              )}
              
              <Button variant="none" onClick={() => this.handleComment()}>
                <BiCommentDetail
                  size="24"
                  style={{ transform: "scaleX(-1)" }}
                />
                Comment
              </Button>
              <Button variant="none">
                <BiShare size="24" style={{ transform: "scaleX(-1)" }} /> Share
              </Button>
              <Button variant="none" onClick={()=>this.commentRequest("POST",post._id)}>
                <BiSend size="24" /> Send
              </Button>
            </Row>
            {showComment && (
              <div className="commentDiv">
                <Row className="flex-nowrap">
                  <img
                    src={this.props.meAvatar}
                    alt=""
                    className="commentAvatar"
                  />
                  <InputGroup className="mb-3 mr-3">
                    <FormControl
                      placeholder="Add a comment..."
                      aria-label="Add a comment"
                      aria-describedby="basic-addon1"
                      name="content"
                      value={payload.content}
                      onChange={(e) => this.handleCommentInput(e)}
                    />
                  </InputGroup>
                </Row>
                <Col>
                  {post.comments.map((comment) => (
                    <Row key={comment._id} className="flex-nowrap my-2">
                      <img
                        src={comment.user.image}
                        alt=""
                        className="commentAvatar"
                      />
                      <Col style={{ backgroundColor: "#ddd" }}>
                        <strong>{`${comment.user.name} ${comment.user.surname}`}</strong>
                        <p>{comment.content}</p>
                      </Col>
                      {this.props.meId === comment.user._id && (
                        <Button
                          variant="outline-danger"
                          onClick={() =>
                            this.commentRequest("DELETE", comment._id)
                          }
                        >
                          Delete
                        </Button>
                      )}
                    </Row>
                  ))}
                </Col>
              </div>
            )}
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

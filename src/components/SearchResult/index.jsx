import React from 'react'
import { ListGroup,Nav } from 'react-bootstrap'
import "./styles.css";
import {withRouter, Link } from "react-router-dom";

class SearchResult extends React.Component{


    render(){
        return(
            <>
           
            <ListGroup  className="results">
           
            {this.props.profile.length !== 0 && this.props.profile.map((result)=>{
                return  <Nav.Link
                className="navCss"
                as={Link}
                to={`/user/${result._id}`}
              >  <ListGroup.Item><img src={result.image}  alt="placeholder"
                margin-left="10px"
                height="40px"
                width="40px" style={{ objectFit: "cover", borderRadius: "50%"}}></img> <b>{result.name} {result.surname}</b></ListGroup.Item>
                </Nav.Link> 
                        // <ListGroup.Item>{result.surname}</ListGroup.Item>
            })}
            </ListGroup>
            {/* <div>
            {this.props.profile.length !== 0 && this.props.profile.map((result)=>{
                return <h4>{result.name}</h4>
            })}
            </div> */}
            </>
        )
    }
}







export default withRouter(SearchResult)
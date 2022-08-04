import React from "react";
import {Card,CardBody,CardLink,CardText,CardTitle} from 'reactstrap';

import './display.css'
const Display = ({url,isLoading,title,image,description,isRecieved}) => {
    return(
        <div className="display"> 
            

           { (isLoading && <h2>Loading...</h2>)
                        ||
            <Card color="dark"
                style={{width: '24rem'}}
                >
                <CardBody color="dark">
                    <CardTitle tag="h5">
                        {title}
                    </CardTitle>
                </CardBody>
                <img src={image} alt="It is not available" width="100%"></img>
                <CardBody>
                    <CardText>
                        {description}
                    </CardText>
                    <CardLink href={url}>
                        Link to Website
                    </CardLink>
                </CardBody>
            </Card>}
        </div>
    );
}

export default Display;
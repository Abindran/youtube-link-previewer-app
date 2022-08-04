import React, { useState } from 'react';
import { Button, Input, InputGroup } from 'reactstrap';
import './App.css';
import Display from './Display';

function App() {
  
  const[url,setUrl] = useState("");
  const[title,setTitle] = useState("");
  const[image,setImage] = useState("");
  const[description,setDescription] = useState("");
  const[isLoading,setIsLoading] = useState(false);
  const[isClicked,setIsClicked] = useState(false);
  const[isRecieved,setIsRecieved] = useState(false);

  const handleChange = (e) => {
    setUrl(e.target.value);
  }

  const sendGetRequest = async() => {
    setIsLoading(true);

    try {
      const response = await fetch('api/',{
        method: 'GET',
        headers:{
          Accept : 'application/json',
        }
      })

      if(!response.ok){
        throw new Error( `Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4))
      setTitle(result.title);
      setImage(result.image);
      setDescription(result.description);

    } catch (error) {
      console.error(error);
    }finally{
      setIsLoading(false);
      setIsRecieved(true);
    }

  }


  const handleClick = (e) =>{
    e.preventDefault();
    setIsClicked(true);
    console.log(url);
    var formBody = [];

    var encodedKey = encodeURIComponent("URL");
    var encodedValue = encodeURIComponent(url);
    formBody.push(encodedKey + "=" + encodedValue);
    formBody = formBody.join("&");

    fetch('api/',{
      method: 'POST',
      headers: {"Content-Type":'application/x-www-form-urlencoded;charset=UTF-8'},
      body: formBody
    }).then(()=>{
      console.log("Url Sent");
    }).finally(()=>{
      sendGetRequest();
    });
  }


  
 
  return (
    <div>
      <header>
        <h1>YouTube Link Preview Generator</h1>
      </header>
      <div className='form'>
        <InputGroup> 
            
            <Input  type="url"  onChange={handleChange} id="url" placeholder="Enter URL of the YouTube video... " />
            <Button onClick={handleClick}>
              Generate
            </Button >
            
          
        </InputGroup>
      </div>
      {isClicked && <Display  url={url} isLoading={isLoading} title={title} description={description} image={image} isRecieved={isRecieved}/>}
    </div>
  );
}

export default App;

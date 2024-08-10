import React, { useEffect, useRef, useState } from "react";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AddIcon from '@mui/icons-material/Add';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import HomeIcon from '@mui/icons-material/Home';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import StarsIcon from '@mui/icons-material/Stars';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import SendIcon from '@mui/icons-material/Send';
import MicNoneIcon from '@mui/icons-material/MicNone';
import generateAnswers from "./aigenerative";
export default function App(){
const mesEnd = useRef(null);

const [usertext,setUserText] = useState("");

const [messages,setmessages] = useState([{
    text:"Hi I am gemini AI , What do you want to ask me ",
    isbot:true
}])

useEffect(()=>{
    mesEnd.current.scrollIntoView();
},[messages])

useEffect(() => {
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSend();
        }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
        document.removeEventListener('keypress', handleKeyPress);
    };
}, [usertext, messages]);


async function handleSend() {
    const answer = await generateAnswers(usertext);
    setmessages([...messages,
        {text:usertext , isbot:false},
        {text: answer , isbot: true}
    ])
    setUserText(""); 
}

    return(
        <div className="App">
            <div className="sideBar">
                <div className="upperSide">
                    <div className="upperSideTop"><SmartToyIcon style={{fontSize:"70px", padding :"5px"}}/><span className="brand">ChatME</span></div>
                    <button className="midBtn"><AddIcon style={{fontSize:"50px"}}/>new chat</button>
                    <div className="upperSideBottom">
                        <button className="query"><ChatBubbleOutlineIcon style={{fontSize:"20px", margin:"15px"}}/>What is Programing?</button>
                        <button className="query"><ChatBubbleOutlineIcon style={{fontSize:"20px", margin:"15px"}}/>How to use Api?</button>
                    </div>
                </div> 
                <div className="lowerSide">
                    <div className="listItems"><HomeIcon style={{fontSize:"25px", margin:"15px"}}/>Home</div>
                    <div className="listItems"><SaveOutlinedIcon style={{fontSize:"25px", margin:"15px"}}/>Saved</div>
                    <div className="listItems"><StarsIcon style={{fontSize:"25px", margin:"15px"}}/>Upgrade to Pro</div>   
                </div>
            </div>
            <div className="main">
                <div className="chats">
                    {messages.map((message,i)=>
                        message.isbot ? (<div key={i} className="chat bot">
                        <SmartToyIcon style={{fontSize:"70px", padding :"5px" , color:"lightblue"}}/><p className="txt">{message.text}</p>
                        </div> )
                        : 
                        (<div key={i} className="chat">
                        <PersonPinIcon style={{fontSize:"70px", padding :"5px", color:"lightblue"}}/><p className="txt">{message.text}</p>
                        </div>)
                    )}
                    <div ref={mesEnd}></div>
                </div>
                <div className="chatFooter">
                    <div className="inp">
                        <input onChange={(event)=>{setUserText(event.target.value)}} type="text" placeholder="send a message..." />
                        <button onClick={handleSend} className="send"><SendIcon style={{fontSize:"30px"}}/></button>
                        <button className="mic"><MicNoneIcon style={{fontSize:"30px"}}/> </button>
                    </div>
                    <p>chatgpt may produce incorrect result</p>
                </div>
            </div>
        </div>
    );
}
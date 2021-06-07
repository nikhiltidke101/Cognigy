import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../_actions/message_actions';
import { SocketClient } from "@cognigy/socket-client";
import Message from './Sections/Message';
import {Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    message:{
        msOverflowStyle: "none",  /* IE and Edge */
        scrollbarWidth: "none"
    },
    root: {
      padding: '4px 4px',
      display:"flex",
      position:"relative",
      zIndex:3,
      marginLeft:"auto",
      marginRight:"auto",
      marginTop: "10px",
      alignItems: 'center',
      width: "97%",
      borderRadius:"10px",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
        backgroundColor:"black",
        borderRadius:"8px",
        color:"white",
        padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));
  

function Chatbot() {
    const classes = useStyles();
    const [value,setValue] = useState("")
    const dispatch = useDispatch();
    const messagesFromRedux = useSelector(state => state.message.messages)
    
    
    const client = new SocketClient("https://endpoint-trial.cognigy.ai/", "7eebd3c716a9c4681d1e7db078ac0dae4bba03e282a902372fa0b4a12537d26e", {
        // if you use node, internet explorer or safari, you need to enforce websockets
        forceWebsockets: true,
      });
    
    client.connect();

    const textQuery = async (text) => {

        //  First  Need to  take care of the message I sent     
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }

        dispatch(saveMessage(conversation))
        // console.log('text I sent', conversation)

        // We need to take care of the message Chatbot sent 
        try {
            //I will send request to the textQuery ROUTE 
            client.sendMessage(text);

            client.on("output", (output) => {
                let conversation = {
                    who: 'bot',
                    content: {
                        text:{
                            text: output.text
                        }
                    }
                }
                dispatch(saveMessage(conversation))
                console.log(conversation)
                console.log(output)
              });

        } catch (error) {
            let conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: "Error just occured, please check the problem"
                    }
                }
            }

            dispatch(saveMessage(conversation))


        }

    }

    const keyPressHandler = (e) => {
        if (e.key === "Enter" ) {
            e.preventDefault();
            if (!value) {
                return alert('you need to type something first')
            }
            //we will send request to textQuery 
            textQuery(value)
            setValue("");
        }
    }
    

    const handleChange = (event)=>{
        setValue(event.target.value)
    }

    const handleClick = () => {
        textQuery(value)
        setValue('')
    }

    const renderOneMessage = (message, i) => { 

        // Template for normal text 
        if (message.content.text.text) {
            return (<><Message key={i} who={message.who} text={message.content.text.text} /><br /></>)
        }
    }

    const renderMessage = (returnedMessages) => {
        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return renderOneMessage(message, i);
            })
        } else {
            return null;
        }
    }


    return (
        <Box style={{
            height: "70vh", width: 550,
            border: '3px solid black', borderRadius: '15px',
            backgroundColor:"rgb(21,25,28)",
            margin:"20px"
        }}>
            <Box style={{ height: "100%", overflowY:"scroll", width: '100%', overflow: 'auto', zIndex:-1,}} className="message">


                {renderMessage(messagesFromRedux)}


            </Box>
            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Text Message"
                    inputProps={{ 'aria-label': 'Text Message' }}
                    value={value}
                    onChange={handleChange}
                    onKeyPress={keyPressHandler}
                />

                <Divider className={classes.divider} orientation="vertical" />
                <IconButton onClick={handleClick} className={classes.iconButton} aria-label="send">
                    <SendRoundedIcon />
                </IconButton>
            </Paper>

        </Box>
    )
}

export default Chatbot;

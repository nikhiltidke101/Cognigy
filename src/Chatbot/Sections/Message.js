import React from 'react'
import {Box} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    backgroundColor:"rgb(255,76,91)",
    color:"white",
    marginBottom: "7px",
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function Message(props) {
    const classes = useStyles();

    if(props.who === "bot"){
      return (
        <Box style={{display:"flex", alignItems: "flex-end", marginLeft:"5px"}}>
           <Avatar src="./bot.png" className={classes.small}/>
            <Box style={{ padding: '1rem' ,
                          backgroundColor:"rgb(45,55,64)", 
                          color:"white", 
                          display:"inline-flex", borderRadius: "15px", margin:"5px", borderBottomLeftRadius:"2px"}} >
              {props.text}
            </Box>
        </Box>
    )
    } else {
      return (
        <Box style={{display:"flex",justifyContent:"flex-end", alignItems: "flex-end", marginRight:"5px"}}>
            <Box style={{ padding: '1rem' ,
                          backgroundColor:"rgb(49,70,198)", 
                          color:"white", 
                          display:"inline-flex", borderRadius: "15px", margin:"5px", borderBottomRightRadius:"2px",justifyContent:"flex-end"}}>
              {props.text}
            </Box>
            <Avatar className={classes.small}>U</Avatar>
        </Box>
    )
    }

    
}

export default Message

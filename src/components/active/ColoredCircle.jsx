import { useEffect,useState } from "react";
import "./ColoredCircle.css";
const ColoredCircle = ({ color }) => {

    const styles = { backgroundColor: color };

    const [Time,SetTime]=useState(60);

    useEffect(() => {
        if(Time<1 || color==="green"){
            return;
        }
        const watch = setInterval(() => {
            SetTime(Time - 1);
            // console.log(Time);
        },1000)

        return () => clearInterval(watch);
    }, [Time]);

    if(color === "red"){
        return(
            <>
            <span className="colored-circle" style={styles} />
            <p className="down">Server is Down reconnecting in {Time} sec</p>
            </>
        ) 
    }
    if(color==="green"){
        return(
            <>
            <span className="colored-circle" style={styles} />
            <p className="up">Server is up</p>
            </>
        ) 
    }
    
    };

export default ColoredCircle;
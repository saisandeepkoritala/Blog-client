import "./ColoredCircle.css";
const ColoredCircle = ({ color }) => {

    const styles = { backgroundColor: color };

    if(color === "red"){
        return(
            <>
            <span className="colored-circle" style={styles} />
            {/* <p className="down">Server is Down</p> */}
            </>
        ) 
    }
    if(color==="green"){
        return(
            <>
            <span className="colored-circle" style={styles} />
            {/* <p className="up">Server is up</p> */}
            </>
        ) 
    }
    
    };

export default ColoredCircle;
import { toast } from "react-toastify";

const Notify = (msg, color) => {
    if(color===null || color === undefined) color = "#3182ce"; // Default to a 'crispy' blue if no color provided
    toast.info(msg, {
        progressStyle: { background: color },
        // Change 'colored' to 'light'
        theme: 'light', 
        style: { 
            background: "white", 
            color: color,
            border: `1px solid ${color}20` // Optional: subtle border for 'crispy' look
        },
    });
}

export default Notify;
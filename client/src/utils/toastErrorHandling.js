import toast from "react-hot-toast";

export const toastErrorHandler = (err) => {
    return toast.error(`${err}`, {
        style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff"
        },
        duration: 9000
    })
} 
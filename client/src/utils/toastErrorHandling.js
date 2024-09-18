import toast from "react-hot-toast";

export const toastErrorHandler = (err) => {
    return toast.error(`${err}`, {
        style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontFamily:"var(--paragraph-font)"
        },
        duration: 9000
    })
} 
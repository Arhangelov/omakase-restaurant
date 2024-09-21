import toast from "react-hot-toast";

export const toastErrorHandler = (err) => {
    return toast.error(`${err}`, {
        style: {
            borderRadius: "10px",
            border: "1px solid rgba(252, 250, 250, 0.13)",
            padding: "1rem",
            background: "rgb(11, 16, 19)",
            color: "rgb(252, 250, 242)",
            fontFamily:"var(--paragraph-font)"
        },
        duration: 9000
    })
} 
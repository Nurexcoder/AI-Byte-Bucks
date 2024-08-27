import toast from "react-hot-toast"

export const errorToast=(message:string)=>{
  return toast.error(message, {
    style: {
      border: '1px solid red',
      padding: '16px',
      color: 'red',
    },
    iconTheme: {
      primary: 'red',
      secondary: 'white',
    },
  })
}
export const successToast=(message:string)=>{
  return toast.success(message, {
    style: {
      border: '1px solid green',
      padding: '16px',
      color: 'green',
    },
    iconTheme: {
      primary: 'green',
      secondary: 'white',
    },
  })
}
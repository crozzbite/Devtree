

interface ErrorMessageProps{
    children:React.ReactNode;
}
export default function ErrorMessage({children}: ErrorMessageProps){
    return(
        <div>{children}</div>
    )
}
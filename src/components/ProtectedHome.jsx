import Header from "./Header";
import Main from "./Main";



export default function ProtectedHome({ dataUser, ...props }) {
    return (
        <>
            <Header dataUser={dataUser} />
            <Main
                name='content'
                {...props}
            />
        </>
    )
}
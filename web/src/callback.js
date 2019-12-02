import { handleAuthentication } from "./auth"

const Callback = () => {
    handleAuthentication()

    return <p>Loading...</p>
}

export default Callback

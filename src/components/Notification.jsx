//import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const Notification = () => {
    //const [errorVisible, setErrorVisible] = useState(isVisible)

    const notification = useSelector(state => state.notification.text)
    const color = useSelector(state => state.notification.color)
    const visible = useSelector(state => state.notification.display)

    const errorElement = () => {
        return(
            <div>
        {visible && <div className='errorMessage' style={{ border: `3px solid ${color}`, color: `${color}`}}><p>{notification}</p></div>}
        </div>
    )}

    return (
        errorElement()
    )
}

export default Notification
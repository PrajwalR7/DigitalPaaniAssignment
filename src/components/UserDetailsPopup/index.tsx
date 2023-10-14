import { User } from "../App"
import './popup.css'

export const UserDetailPopup = ({ user }: { user: User }) => {
    console.log("User details popup - ", user)
    return(
        <div className="popup-container">
            <div className="popup-container-card">
                <div className="popup-background"></div>
                <h3>{user.name}</h3>
                <div className="popup-card">
                    <p>{user.bio}</p>
                    <p>{user.email}</p>
                    <p>{user.contact}</p>
                </div>
            </div>
        </div>
    )
}
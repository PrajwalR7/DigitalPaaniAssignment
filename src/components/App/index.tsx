import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {validateBio, validateEmail, validateName, validatePhone} from '../../utils/validation'
import './app.css'
import painting from "../../assets/painting.jpg"
import { UserDetailPopup } from '../UserDetailsPopup';
import { artEventDetails, eventDetails } from '../../const';

export interface User {
  name: string,
  email: string,
  contact: string
  bio?: string
}

function App() {
  const [userList, setUserList] = useState<User[]>([])

  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPhoneValid, setIsPhoneValid] = useState(true)
  const [isNameValid, setIsNameValid] = useState(true)
  const [isBioValid, setIsBioValid] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User>()

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const canRegister = (): boolean => {
    console.log((isEmailValid && isBioValid && isPhoneValid && isNameValid))
    return (isEmailValid && isBioValid && isPhoneValid && isNameValid)
  }

  const cleanupInputState = () => {
    setEmail("")
    setBio("")
    setName("")
    setPhone("")
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIsEmailValid(validateEmail(value))
    setEmail(value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIsPhoneValid(validatePhone(value))
    setPhone(value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIsNameValid(validateName(value))
    setName(value);
  };

  const handleBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setIsBioValid(validateBio(value))
    setBio(value);
  };

  const handleRegistration = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('Hello world')
    e.preventDefault()
      // Set the userData and store to localStorage
    const currentUser ={
      name,
      email,
      contact: phone,
      bio
    }
    console.log('>> currentuser = ',currentUser)
    setUserList((prev) => [...prev, currentUser])
    cleanupInputState()
    localStorage.setItem('users', JSON.stringify([...userList, currentUser]))

  }

  const viewMoreHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, user: User) => {
    e.preventDefault()
    e.stopPropagation()

    setSelectedUser(user)
    setShowModal(true)
  }

  useEffect(() => {
    console.log(userList)
    console.log(localStorage.getItem("users"))
    setUserList(JSON.parse(localStorage.getItem('users') ?? "[]"))

    addEventListener('click', () => {
      setShowModal(false)
    })
  }, [])


  return (
    <div className='main-container'>
      <div className='form-container'>
        <div className='form-card'>
          <div className='form-image-card'>
            <img src={painting} />
            <h3>Join us and showcase your art</h3>
          </div>
          <div className='form-card-data'>
            <h3>Fill and Register</h3>
            <input className={isNameValid ? "input-field" : "input-invalid-field"} type='text' onChange={handleNameChange} placeholder='Full Name'/>
            <input className={isEmailValid ? "input-field" : "input-invalid-field"} type='email' onChange={handleEmailChange} placeholder='Email'/>
            <input className={isPhoneValid ? "input-field" : "input-invalid-field"} type='number' onChange={handlePhoneChange} placeholder='Contact'/>
            <textarea className={isBioValid ? "text-area-field" : "text-area-invalid-field"} onChange={handleBioChange} placeholder='Bio'/>
            <button className={canRegister() ? 'form-button' : 'disabled-form-button'} onClick={handleRegistration} disabled={!canRegister()}>Register</button>
          </div>
        </div>
      </div>
      <div className='user-container'>
        <div className='event-details'>
          <p className='event-detail-content'>{eventDetails}</p>
          <div className='event-highlights'>
              <h4>Event Details</h4>
            {
              Object.keys(artEventDetails).map(detail => {
                return (
                  <div className='single-event-detail'>
                    <label>{detail}</label>:
                    <p>{artEventDetails[detail]}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
        <h2>All these wonderful people have already registered</h2>
        <div className="user-card">
            {
              userList.map(user => {
                return (
                    <div className='user-card-element'>
                      <div className='user-content'>
                        <p className="user-name">{user.name}</p>
                        <p className='user-bio'>{user.bio ?? ''}</p>
                      </div>
                      <button onClick={(e) => viewMoreHandler(e, user)}>View more</button>
                    </div>
                )
              })
            }
        </div>
      </div>
      { showModal && selectedUser && <UserDetailPopup user={selectedUser}/> }
    </div>
  );
}

export default App;

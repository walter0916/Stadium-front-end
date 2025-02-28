// npm modules 
import { useState, useRef } from "react";

// services
import * as profileService from '../../services/profileService';

// styles 
import styles from './EditProfileForm.module.css'

const EditProfileForm = (props) => {
  const [formData, setFormData] = useState({
    name: props.profile.name,
  })
  const [profilePhoto, setProfilePhoto] = useState(props.profile.photo)
  const [message, setMessage] = useState('')
  const [photoData, setPhotoData] = useState({ photo: null })
  const imgInputRef = useRef(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleChangePhoto = (evt) => {
    const file = evt.target.files[0]
    let isFileInvalid = false
    let errMsg = ''
    const validFormats = ['gif', 'jpeg', 'jpg', 'png', 'svg', 'webp']
    const photoFormat = file.name.split('.').at(-1)
    if (file.size >= 10485760) {
      errMsg = 'Image must be smaller than 10.4MB'
      isFileInvalid = true
    }
    if (!validFormats.includes(photoFormat)) {
      errMsg = 'Image must be in gif, jpeg/jpg, png, svg, or webp format'
      isFileInvalid = true
    }
    setMessage(errMsg)
    if (isFileInvalid) {
      imgInputRef.current.value = null
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setProfilePhoto(reader.result)
    };
    reader.readAsDataURL(file)
    setPhotoData({ photo: evt.target.files[0] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleEditProfile(formData, photoData.photo)
  }

  const handleEditProfile = async (formData, photoData) => {
    await profileService.editProfile(formData, photoData)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.imgContainer} onClick={() => imgInputRef.current.click()}>
        <img src={profilePhoto} alt="Profile" className={styles.profilePhoto} />
        <div className={styles.photoOverlay}>
          <span>Click to Change Photo</span>
        </div>
      </div>
      <input
        type="file"
        id="photo"
        name="photo"
        accept="image/*"
        onChange={handleChangePhoto}
        ref={imgInputRef}
        className={styles.photoInput}
      />
      {message && <div className={styles.errorMessage}>{message}</div>}
      <div className={styles.inputContainer}>
        <label className={styles.label}>Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.submitBtn}>Update Profile</button>
    </form>
  )
}

export default EditProfileForm

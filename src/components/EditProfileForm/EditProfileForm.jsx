// npm modules 
import { useState } from "react";

// services
import * as profileService from '../../services/profileService';

const EditProfileForm = (props) => {
  const [formData, setFormData] = useState({
    name: props.profile.name,
    photo: props.profile.photo,
  })

  const [newPhoto, setNewPhoto] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    setNewPhoto(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData({ ...formData, photo: reader.result })
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPhoto) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result })
      }
      reader.readAsDataURL(newPhoto)
    }
    await profileService.updateProfile(formData)
    setNewPhoto(null)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="photo">Profile Photo:</label>
        <img
          src={formData.photo}
          alt="Profile"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handlePhotoChange}
        />
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default EditProfileForm;
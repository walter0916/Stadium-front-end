// npm module 
import { useState } from "react"

// services
import  * as communityService from '../../services/communityService'

// styles 
import style from './CreateCommunityForm.module.css'

const CreateCommunityForm = () => {
  const [formData, setFormData] = useState({
    teamName: ''
  })

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormData({teamName: ''})
  }

  return (
    <div>
      <form action="">
        <label>Community Name:</label>
        <input 
          type="text"
          required
          name="teamName"
          value={formData.teamName}
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateCommunityForm;
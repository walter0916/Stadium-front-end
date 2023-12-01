import { useState, useRef } from "react"

const PostForm = (props) => {
  const imgInputRef = useRef(null)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    content: '',
  })
  const [photoData, setPhotoData] = useState({ photo: null })

  const handleChange = (evt) => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleChangePhoto = evt => {
    const file = evt.target.files[0]
    let isFileInvalid = false
    let errMsg = ""
    const validFormats = ['gif', 'jpeg', 'jpg', 'png', 'svg', 'webp']
    const photoFormat = file.name.split('.').at(-1)
    // cloudinary supports files up to 10.4MB each as of May 2023
    if (file.size >= 10485760) {
      errMsg = "Image must be smaller than 10.4MB"
      isFileInvalid = true
    }
    if (!validFormats.includes(photoFormat)) {
      errMsg = "Image must be in gif, jpeg/jpg, png, svg, or webp format"
      isFileInvalid = true
    }
    
    setMessage(errMsg)
    
    if (isFileInvalid) {
      imgInputRef.current.value = null
      return
    }

    setPhotoData({ photo: evt.target.files[0] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleAddPost(formData, photoData.photo)
    setFormData({content: ''})
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>
      <p>{message}</p>
        <textarea 
          required 
          name="content"
          type="text"
          id="text-input" 
          cols="30" 
          rows="10"
          value={formData.content}
          onChange={handleChange}
        />
        <input 
          type="file"
          required
          name="photo"
          ref={imgInputRef}
          onChange={handleChangePhoto} 
        />
        <button type="submit">
          Post
        </button>
      </form>
    </div>
  )
}

export default PostForm
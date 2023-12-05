import { useState, useRef } from "react"
import styles from './BlogForm.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

const BlogForm = () => {
  const imgInputRef = useRef(null)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    title: '' ,
    content: ''
  })
  const [photoData, setPhotoData] = useState({ photo: null })
  const [selectedFileName, setSelectedFileName] = useState('');

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
    setSelectedFileName(evt.target.files[0].name)
  }

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value })
  }

  return (
    <div className={styles.formContainer}>
      <h2>Create a New Blog</h2>
      <form className={styles.form}>
        <label>Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <div className={styles.fileInputContainer}>
          <label className={styles.fileInputLabel}>
            <FontAwesomeIcon icon={faCloudUploadAlt} className={styles.uploadIcon} />
            {selectedFileName || 'Upload a Photo'}
            <input
              type="file"
              required
              name="photo"
              ref={imgInputRef}
              onChange={handleChangePhoto}
              className={styles.fileInput}
            />
          </label>
        </div>

        <label>Content:</label>
        <textarea
          id="content"
          cols="50" 
          rows="60"
          value={formData.content}
          name="content"
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>

    </div>
  )
}

export default BlogForm
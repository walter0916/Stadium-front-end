import { useState, useRef } from "react"
import styles from './PostForm.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

const PostForm = (props) => {
  const imgInputRef = useRef(null)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    content: '',
  })
  const [photoData, setPhotoData] = useState({ photo: null })
  const [selectedFileName, setSelectedFileName] = useState('');
  console.log(selectedFileName)


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
    setSelectedFileName(evt.target.files[0].name)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleAddPost(formData, photoData.photo)
    setFormData({content: ''})
    setSelectedFileName('')
  }



  return (
    <div className={styles.postFormContainer}>
      <form onSubmit={handleSubmit} className={styles.postForm}>
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
          className={styles.textarea}
        />
        <div className={styles.fileInputContainer}>
          <label className={styles.fileInputLabel}>
            <FontAwesomeIcon icon={faCloudUploadAlt} className={styles.uploadIcon} />
            {selectedFileName || 'Choose a file'}
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
        <button type="submit" className={styles.submitButton}>
          Post
        </button>
      </form>
    </div>
  )
}

export default PostForm
import { useState, useRef, useEffect } from "react"
import styles from './BlogForm.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import * as blogService from '../../services/blogService'
import * as leagueService from '../../services/leagueService'
const BlogForm = () => {
  const imgInputRef = useRef(null)
  const [leagues, setLeagues] = useState({})
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    title: '' ,
    content: '',
    leagueId: 0
  })
  const [photoData, setPhotoData] = useState({ photo: null })
  const [selectedFileName, setSelectedFileName] = useState('');

  useEffect(() => {
    const fetchLeagues = async () => {
      const data = await leagueService.getAllLeagues()
      setLeagues(data)
    }
    fetchLeagues()
  }, [])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    handleAddBlog(formData, photoData.photo)
    setFormData({
      content: '',
      title: '',
      leagueId: 0
    })
    setSelectedFileName('')
  }

  const handleAddBlog = async (blogFormData, photoData) => {
    await blogService.create(blogFormData, photoData)
  }

  return (
    <div className={styles.formContainer}>
      <h2>Create a New Blog</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          className={styles.titleInput}
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
          type="text"
          className={styles.contentInput}
          cols="90" 
          rows="60"
          value={formData.content}
          name="content"
          onChange={handleChange}
          required
        ></textarea>
        <label>League</label>
        <select 
        name="leagueId"
        required
        value={formData.leagueId}
        onChange={handleChange}
        >
          <option value="">Select League</option>
          {leagues.length ? (leagues.map(league => (
            <option value={league._id} key={league._id}>
              {league.leagueName}
            </option>
          ))) : ''}
        </select>
        <button className={styles.submitBtn} type="submit">Post</button>
      </form>
    </div>
  )
}

export default BlogForm
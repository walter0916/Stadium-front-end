import { useState, useEffect } from "react"
import styles from './CommentForm.module.css'
import * as profileService from '../../services/profileService'

const CommentForm = (props) => {
  const [formData, setFormData] = useState({
    content: ''
  })
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await profileService.getProfileById(props.user.profile)
      setProfile(data)
    }
    fetchProfile()
  }, [props.user.profile])

  const handleCommentChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleAddComment(props.blogId, formData)
    setFormData({content: ''})
  }

  return (
    <div>
      <form className={styles.commentForm} onSubmit={handleSubmit} >
        <img src={profile.photo} alt="" className={styles.profilePhoto}/>
      <textarea
      className={styles.commentTextArea}
        placeholder="Say something..."
        type="text"
        name="content"
        value={formData.content}
        onChange={handleCommentChange}
      />
      <button className={styles.submitButton} type="submit">Send</button>
    </form>
    </div>
  )
}

export default CommentForm
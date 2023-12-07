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

  console.log(profile)

  return (
    <div>
      <form className={styles.commentForm} >
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
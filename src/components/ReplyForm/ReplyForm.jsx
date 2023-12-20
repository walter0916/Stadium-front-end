// npm modules
import { useState } from 'react'

// styles
import styles from './ReplyForm.module.css'

const ReplyForm = (props) => {
  const [formData, setFormData] = useState({
    content: ''
  })

  const handleReplyChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleAddReply(formData)
    setFormData({content: ''})
  };

  console.log(formData)

  return (
    <form className={styles.replyForm} onSubmit={handleSubmit}>
      <textarea
      className={styles.replyTextArea}
        placeholder="Type your reply..."
        type="text"
        name="content"
        value={formData.content}
        onChange={handleReplyChange}
      />
      <button className={styles.replyButton} type="submit">Submit Reply</button>
    </form>
  )
}

export default ReplyForm

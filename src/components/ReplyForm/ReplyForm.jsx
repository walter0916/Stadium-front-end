import { useState } from 'react';


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
    setFormData('')
  };

  console.log(formData)

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Type your reply..."
        type="text"
        name="content"
        value={formData.content}
        onChange={handleReplyChange}
      />
      <button type="submit">Submit Reply</button>
    </form>
  )
}

export default ReplyForm

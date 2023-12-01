import { useState } from 'react';

const ReplyForm = () => {
  const [formData, setFormData] = useState({
    content: ''
  })

  const handleReplyChange = (event) => {
    setFormData(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormData('')
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Type your reply..."
        value={formData.content}
        onChange={handleReplyChange}
      />
      <button type="submit">Submit Reply</button>
    </form>
  )
}

export default ReplyForm

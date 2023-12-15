import * as tokenService from './tokenService'


const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/comments`

async function createComment(blogId, blogFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${blogId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blogFormData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function createReply(blogId, commentId, blogFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${blogId}/${commentId}/replies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blogFormData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function addLikeOrDislike( commentId, formData) {
  try {
    const res = await fetch(`${BASE_URL}/${commentId}/likes&dislikes`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    return res.json()
  } catch (error) {
    throw new Error('Failed to create like or dislike response')
  }
}

export {createComment, createReply, addLikeOrDislike}
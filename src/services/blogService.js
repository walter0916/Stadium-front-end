import * as tokenService from './tokenService'


const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/blogs`

async function getAllBlogs() {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (error) {
    throw new Error(error)
  }
}

async function getBlogById(blogId) {
  try {
    const res = await fetch(`${BASE_URL}/${blogId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (error) {
    throw new Error(error)
  }
}

async function create(blogFormData, photoData) {
  const formData = new FormData()
  formData.append('photo', photoData)
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogFormData)
    })
    const createdBlog = await res.json()
    if (createdBlog._id) {
      await addPhotoToBlog( createdBlog._id, photoData)
    } else {
      console.error('Failed to create blog - Server response:', createdBlog)
    }
    return createdBlog
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create blog')
  }
}

async function addPhotoToBlog(blogId, photoData) {
  try {
    const formData = new FormData()
    formData.append('photo', photoData)
    const res = await fetch(`${BASE_URL}/${blogId}/add-photo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
      body: formData,
    })
    const updatedBlog = await res.json()
    return updatedBlog
  } catch (error) {
    console.log(error)
    throw new Error('Failed to add photo to blog')
  }
}

async function createComment(blogId, blogFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${blogId}/comments`, {
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
    const res = await fetch(`${BASE_URL}/${blogId}/comments/${commentId}/replies`, {
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

async function addLikeOrDislike(blogId, postId, formData) {
  try {
    const res = await fetch(`${BASE_URL}/${blogId}/likesordislikes`, {
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

export { create, getAllBlogs, getBlogById, createComment, createReply, addLikeOrDislike }
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/notifications`

async function getAllNotifications() {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (error) {
    throw new Error(error)
  }
}

async function getUserNotifications(profileId) {
  try {
    const res = await fetch(`${BASE_URL}/${profileId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (error) {
    throw new Error(error)
  }
}


async function createPostNotification( postId, formData) {
  try {
    const res = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function createBlogNotification(blogId, formData) {
  try {
    const res = await fetch(`${BASE_URL}/${blogId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function create(bookingFormData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingFormData),

    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function updateStatus(notificationId, newStatus) {
  try {
    const res = await fetch(`${BASE_URL}/${notificationId}/edit`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({read: newStatus}),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export { getAllNotifications, getUserNotifications, createPostNotification, createBlogNotification, updateStatus }
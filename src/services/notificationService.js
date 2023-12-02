import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/notifications`

async function createPostNotification(communityId, postId, formData) {
  try {
    const res = await fetch(`${BASE_URL}/${communityId}/posts/${postId}`, {
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

export { createPostNotification }
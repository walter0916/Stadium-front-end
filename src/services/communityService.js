import * as tokenService from './tokenService'


const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/communities`

async function getAllCommunities() {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (error) {
    throw new Error(error)
  }
}

async function getCommunityById(communityId) {
  try {
    const res = await fetch(`${BASE_URL}/${communityId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function createPost(communityId, postFormData, photoData) {
  try {
    const formData = new FormData()
    formData.append('photo', photoData)
    const res = await fetch(`${BASE_URL}/${communityId}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postFormData),
    })
    const createdPost = await res.json()
    if (createdPost._id) {
      await addPhotoToPost(communityId, createdPost._id, photoData)
    } else {
      console.error('Failed to create post')
    }
    return createdPost
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create post')
  }
}

async function addPhotoToPost(communityId, postId, photoData) {
  try {
    const formData = new FormData()
    formData.append('photo', photoData)
    const res = await fetch(`${BASE_URL}/${communityId}/posts/${postId}/add-photo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
      body: formData,
    })
    const updatedPost = await res.json()
    return updatedPost
  } catch (error) {
    console.log(error)
    throw new Error('Failed to add photo to post')
  }
}

async function createReply(communityId, postId, formData) {
  try {
    const res = await fetch(`${BASE_URL}/${communityId}/posts/${postId}/replies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    return res.json()
  } catch (error) {
    throw new Error('Failed to create reply')
  }
}

async function addLikeOrDislike(communityId, postId, formData) {
  try {
    const res = await fetch(`${BASE_URL}/${communityId}/posts/${postId}/likes&dislikes`, {
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

export { getAllCommunities, getCommunityById, createPost, createReply, addLikeOrDislike }
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

async function joinCommunity(communityId) {
  try {
    const res = await fetch(`${BASE_URL}/${communityId}/join`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function leaveCommunity(communityId) {
  try {
    const res = await fetch(`${BASE_URL}/${communityId}/leaveCommunity`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}


export { getAllCommunities, getCommunityById, leaveCommunity, joinCommunity }
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/leagues`

async function getAllLeagues() {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (error) {
    throw new Error(error)
  }
}

async function getLeagueById(leagueId) {
  try {
    const res = await fetch(`${BASE_URL}/${leagueId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (error) {
    throw new Error(error)
  }
}

async function getStandings(standingId, year) {
  try {
    const res = await fetch(`${BASE_URL}/standings/${standingId}/${year}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (error) {
    throw new Error(error)
  }
}

async function getFixtures(leagueId, year) {
  try {
    const res = await fetch(`${BASE_URL}/fixtures/${leagueId}/${year}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (error) {
    throw new Error(error)
  }
}

async function getLeagueStats(leagueId, year) {
  try {
    const res = await fetch(`${BASE_URL}/leagueStats/${leagueId}/${year}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (error) {
    throw new Error(error)
  }
}


async function getLeagueInfo(formData) {
  try {
    const res = await fetch(`${BASE_URL}/getLeagueInfo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

export { getAllLeagues, getLeagueById, getStandings, getFixtures, getLeagueInfo, getLeagueStats }
const BASE_URL = 'https://api-football-v1.p.rapidapi.com/v3/standings?season=2023&'

async function getLeagueById(leagueId) {
  try {
    const res = await fetch(`${BASE_URL}league=${leagueId}`, {
      headers: {
        'X-RapidAPI-Key': '12ecfbfe5cmsh75c32943e01f236p1165d7jsn91e9fd534dce',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      },
    })
    return await res.json()
  } catch (error) {
    throw new Error(error)
  }
}

export {
  getLeagueById
}
const API_BASE = '/api'

async function fetchLeaderboard() {
  const res = await fetch(`${API_BASE}/leaderboard`)
  const data = await res.json()
  return data
}

function renderLeaderboard(list) {
  const tbody = document.querySelector('#leaderboard-table tbody')
  tbody.innerHTML = ''
  list.forEach((row, idx) => {
    const tr = document.createElement('tr')
    tr.innerHTML = `<td>${idx + 1}</td><td>${row.userId}</td><td>${row.score}</td>`
    tbody.appendChild(tr)
  })
}

async function loadLeaderboard() {
  try {
    const data = await fetchLeaderboard()
    if (!data.success) throw new Error(data.error || 'Failed to load')
    renderLeaderboard(data.leaderboard)
  } catch (err) {
    console.error(err)
    alert('Could not load leaderboard')
  }
}

// Score form
const scoreForm = document.getElementById('score-form')
scoreForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const form = new FormData(scoreForm)
  const payload = { userId: form.get('userId'), points: Number(form.get('points')) }
  const res = await fetch(`${API_BASE}/leaderboard/score`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  })
  const data = await res.json()
  const out = document.getElementById('score-result')
  if (data.success) {
    out.textContent = `Score updated: ${data.score} (attempts: ${data.attempts})`
    loadLeaderboard()
  } else {
    out.textContent = `Error: ${data.error || 'unknown'}`
  }
})

// View form
const viewForm = document.getElementById('view-form')
viewForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const form = new FormData(viewForm)
  const postId = form.get('postId')
  const res = await fetch(`${API_BASE}/post/${encodeURIComponent(postId)}/view`, { method: 'POST' })
  const data = await res.json()
  const out = document.getElementById('view-result')
  if (data.success) {
    out.textContent = `Post ${data.postId} views: ${data.views}`
  } else {
    out.textContent = `Error: ${data.error || 'unknown'}`
  }
})

// Refresh button
document.getElementById('refresh').addEventListener('click', loadLeaderboard)

// initial load
loadLeaderboard()

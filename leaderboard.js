const displayLeaderboard = () => {
    const leaderboardDiv = document.createElement('div')
    const leaderboardHeader = document.createElement('h1')
    leaderboardHeader.innerText = `Geo Hunt Player Stats`
    leaderboardHeader.className = 'text-center'
    leaderboardHeader.style.paddingTop = "10px"
    leaderboardHeader.style.paddingBottom = "10px"

    const leaderboardTable = document.createElement('table')
    leaderboardTable.className = "table table-hover table-sm tabel-responsive table-success"
    leaderboardTable.innerHTML = 
    `
    <thead>
      <tr>
        <th>User</th>      
        <th>Name</th>
        <th>Total Games Played</th>
        <th>Games Won</th>
        <th>Games Failed</th>
        <th>Fastest game</th>
        <th>Slowest game</th>

      </tr>
    </thead>

    <tbody>
    </tbody>
    `

    leaderboardDiv.append(leaderboardHeader, leaderboardTable)
    interfaceDiv.append(leaderboardDiv)

    fetchData(userUrl)
    .then(users => {
      users.forEach(user =>
        {
          const tr = document.createElement('tr')
          tr.dataset.id = user.id
          tr.addEventListener("click", displayUserProfile)

          const body = document.querySelector('tbody')

          const failedAttempts = user.attempts.filter(attempt => attempt.status === "Failed")

          const completedAttempts = user.attempts.filter(attempt => attempt.status === "Completed")

          let playTime = completedAttempts.map(attempt => attempt.time_taken)
          let maxPlayTime
          let minPlayTime
          if (playTime.length < 1){
            maxPlayTime = "n/a"
            minPlayTime = "n/a"
            tr.innerHTML = 
          `
          <td>${user.username}</td>
          <td>${user.name}</td>
          <td>${user.attempts.length}</td>
          <td>${completedAttempts.length}</td>
          <td>${failedAttempts.length}</td>
          <td>${minPlayTime}</td>
          <td>${maxPlayTime}</td>
          `
          } else {
            maxPlayTime = Math.max(...playTime)
            minPlayTime = Math.min(...playTime)
            tr.innerHTML = 
          `
          <td>${user.username}</td>
          <td>${user.name}</td>
          <td>${user.attempts.length}</td>
          <td>${completedAttempts.length}</td>
          <td>${failedAttempts.length}</td>
          <td>${minPlayTime} seconds</td>
          <td>${maxPlayTime} seconds</td>
          `
          }
          
          body.append(tr)
        })
    })
}


const displayUserProfile = (e) => {
    interfaceDiv.innerHTML = ""
    fetchData(userUrl + `/${e.target.parentElement.dataset.id}`)
    .then(user => {
        const username = document.createElement('h1')
        username.innerText = `${user.username}`
        username.className = 'text-center'

        const tableTitle = document.createElement('p')
        tableTitle.innerText = 'Attempts Record'
        tableTitle.className = 'text-center'

        const table = document.createElement('table')
        table.className = "table table-hover table-sm tabel-responsive table-success"
        table.innerHTML = 
        `
        <thead>
          <tr>
            <th>Puzzle</th>      
            <th>Status</th>
            <th>Time Taken</th>
          </tr>
        </thead>

        <tbody>
        </tbody>
        `
        interfaceDiv.append(username, tableTitle, table)

        user.attempts.forEach(attempt => {

          const tr = document.createElement('tr')
          const body = document.querySelector('tbody')

          let time
          if (!attempt.time_taken) 
            { time = "n/a"
          } else {
            time = attempt.time_taken
          }

          tr.innerHTML = 
          `
          <td>${attempt.puzzle.title}</td>
          <td>${attempt.status}</td>
          <td>${time}</td>
          `
          body.append(tr)
          
        })
    })
}
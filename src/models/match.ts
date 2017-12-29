interface Match {
  key: string
  actualTime?: string
  predictedTime: string
  time?: Date
  blueWon?: boolean
  redScore?: number
  blueScore?: number
  redAlliance?: string[]
  blueAlliance?: string[]
}

export default Match

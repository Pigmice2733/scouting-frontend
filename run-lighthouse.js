#!/usr/bin/env node

/* eslint-disable no-console */

const { exec } = require('child_process')
const chalk = require('chalk')

const prNum = process.env.CI_PULL_REQUEST
  ? process.env.CI_PULL_REQUEST.split('/').pop()
  : undefined

const url =
  'https://' +
  (prNum ? `deploy-preview-${prNum}--scouting.netlify.com` : 'pigmice.ga')

const command = `./node_modules/.bin/lighthouse --output json --chrome-flags="--no-sandbox --headless" ${url}`

/**
 * @param {string} cmd
 * @returns {Promise<{stdout: string, stderr: string}>}
 */
const run = cmd =>
  new Promise((resolve, reject) => {
    const child = exec(cmd)
    let stdout = ''
    let stderr = ''
    child.addListener('error', () => reject(stderr))
    child.addListener('exit', () => resolve(stdout))
    child.stdout.on('data', d => {
      stdout += d
    })
    child.stderr.on('data', d => {
      console.error(d)
      stderr += d
    })
  })

const minimums = {
  seo: prNum ? 0.7 : 0.8,
  'best-practices': 0.93,
  accessibility: 0.62,
  pwa: 1,
  performance: 0.95
}

/**
 * @param {number} input
 */
const percent = input => Math.round(input * 100)

/**
 * @param {boolean} fail
 * @param {number} score
 * @param {number} minimum
 * @param {string} category
 */
const print = (fail, score, minimum, category) => {
  const symbol = fail ? chalk.red('✖') : chalk.green('✔')
  const cat = chalk.bold(
    category.padEnd(20, '.').replace(/\./g, chalk.ansi256(239)('·'))
  )
  const min = chalk.dim(`(min. ${percent(minimum)})`)
  const s = chalk.bold(percent(score))
  return chalk`${symbol} ${cat}${fail ? chalk.red(s) : s} ${min}`
}

const main = async () => {
  console.log(chalk`Running lighthouse for {bold.cyan ${url}}`)
  const output = JSON.parse(await run(command)).categories
  return Object.values(output).reduce((hasFailed, category) => {
    const fail = category.score < minimums[category.id]
    console.log(
      print(fail, category.score, minimums[category.id], category.title)
    )
    return fail ? false : hasFailed
  }, true)
}

main()
  .then(passed => {
    if (passed) {
      console.log('\n' + chalk.green('✨ All good ✔'))
    } else {
      console.log('\n' + chalk.red('😢 Lighthouse did not pass ✖'))
      process.exit(1)
    }
  })
  .catch(error => {
    throw error
  })

/* eslint-enable no-console */

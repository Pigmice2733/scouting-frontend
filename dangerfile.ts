import { danger, warn, fail } from 'danger'
import { CLIEngine } from 'eslint'
import * as eslintConfig from './.eslintrc'

const filesToCheck = [...danger.git.created_files, ...danger.git.modified_files]

const eslint = new CLIEngine(eslintConfig as CLIEngine.Options)

const isJsFile = (f: string) =>
  f.endsWith('ts') || f.endsWith('tsx') || f.endsWith('js')

filesToCheck.filter(isJsFile).forEach(async f => {
  const text = await danger.github.utils.fileContents(f)
  const { results } = eslint.executeOnText(text)
  results[0].messages.forEach(message => {
    if (message.severity === 2) {
      fail(message.message, f, message.line)
    } else if (message.severity === 1) {
      warn(message.message, f, message.line)
    }
  })
})

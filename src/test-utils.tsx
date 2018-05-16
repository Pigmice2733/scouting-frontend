import { render, VNode } from 'preact'

const help = <T extends Element>(tree: JSX.Element): T => {
  const mountPoint = document.createElement('div')
  render(tree, mountPoint)
  return mountPoint.firstElementChild as T
}

export default help

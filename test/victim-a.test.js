import { expect, test } from 'vitest'

test('receives no click', async () => {
  let clicks = 0
  document.body.innerHTML = '<button>Start</button>'
  document.querySelector('button').addEventListener('click', () => clicks++)
  await new Promise(resolve => setTimeout(resolve, 2000))
  expect(clicks).toBe(0)
})

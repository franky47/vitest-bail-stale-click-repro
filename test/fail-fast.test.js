import { test } from 'vitest'

test('fails after 1 second', async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  throw new Error('fail to trigger bail')
})

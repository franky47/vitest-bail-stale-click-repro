import { test } from 'vitest'
import { page, userEvent } from 'vitest/browser'

test('clicks its own button for 3 seconds', async () => {
  document.body.innerHTML = '<button>Start</button>'
  const end = performance.now() + 3000
  while (performance.now() < end) {
    await userEvent.click(page.getByRole('button', { name: 'Start' }))
  }
})

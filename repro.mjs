// One Vitest instance, two runs, like Stryker's vitest runner.
import { createVitest } from 'vitest/node'

const vitest = await createVitest('test', { watch: false, bail: Number(process.env.BAIL ?? 1) })

async function run(files) {
  vitest.state.filesMap.clear()
  await vitest.start(files)
  for (const file of vitest.state.getFiles()) {
    for (const task of file.tasks) {
      console.log(`  ${file.name}: ${task.result?.state} ${task.result?.errors?.[0]?.message ?? ''}`)
    }
  }
}

console.log('Run 1: fail-fast fails and bail cancels clicker while it clicks')
await run(['test/clicker.test.js', 'test/fail-fast.test.js'])
console.log('Run 2: no test in this run clicks anything')
await run(['test/victim-a.test.js', 'test/victim-b.test.js'])
await vitest.close()

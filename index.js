function setValue(environmentVariable, context, branch, suffix) {
  const contextEnvironmentVariable = suffix ? `${environmentVariable}_${context}` : `${context}_${environmentVariable}`
  const branchEnvironmentVariable = suffix ? `${environmentVariable}_${branch}` : `${branch}_${environmentVariable}`

  if (process.env[contextEnvironmentVariable]) {
    process.env[environmentVariable] = process.env[contextEnvironmentVariable]
    console.log(`Replacing ${environmentVariable} with ${contextEnvironmentVariable}`)
  }

  if (process.env[branchEnvironmentVariable]) {
    process.env[environmentVariable] = process.env[branchEnvironmentVariable]
    console.log(`Replacing ${environmentVariable} with ${branchEnvironmentVariable}`)
  }
}

module.exports = {
  onPreBuild({ inputs: { suffix } }) {
    const environmentVariables = Object.keys(process.env)
    const context = process.env.CONTEXT.toUpperCase().replace(/[\/-]/g, '_')
    const branch = process.env.BRANCH.toUpperCase().replace(/[\/-]/g, '_')

    environmentVariables.forEach(environmentVariable => {
      setValue(environmentVariable, context, branch, suffix)
    })
  },
}

const { onPreBuild } = require('./index')

describe('branch deploy', () => {
  beforeEach(() => {
    process.env.ENVIRONMENT_VARIABLE = 'PRODUCTION'
    process.env.CONTEXT = 'branch-deploy'
    process.env.BRANCH = 'development'
  })

  it('replaces the environment variable value with suffix', () => {
    process.env.ENVIRONMENT_VARIABLE_BRANCH_DEPLOY = 'BRANCH DEPLOY'
  
    onPreBuild({ inputs: { suffix: true } })
  
    expect(process.env.ENVIRONMENT_VARIABLE).toBe(process.env.ENVIRONMENT_VARIABLE_BRANCH_DEPLOY)
  })

  it('replaces the environment variable value with prefix', () => {
    process.env.BRANCH_DEPLOY_ENVIRONMENT_VARIABLE = 'BRANCH DEPLOY'
  
    onPreBuild({ inputs: { suffix: false } })
  
    expect(process.env.ENVIRONMENT_VARIABLE).toBe(process.env.BRANCH_DEPLOY_ENVIRONMENT_VARIABLE)
  })
})

describe('deploy preview', () => {
  beforeEach(() => {
    process.env.ENVIRONMENT_VARIABLE = 'PRODUCTION'
    process.env.CONTEXT = 'deploy-preview'
    process.env.BRANCH = 'development'
  })

  it('replaces the environment variable value with suffix', () => {
    process.env.ENVIRONMENT_VARIABLE_DEPLOY_PREVIEW = 'DEPLOY PREVIEW'
  
    onPreBuild({ inputs: { suffix: true } })
  
    expect(process.env.ENVIRONMENT_VARIABLE).toBe(process.env.ENVIRONMENT_VARIABLE_DEPLOY_PREVIEW)
  })

  it('replaces the environment variable value with prefix', () => {
    process.env.DEPLOY_PREVIEW_ENVIRONMENT_VARIABLE = 'DEPLOY PREVIEW'
  
    onPreBuild({ inputs: { suffix: false } })
  
    expect(process.env.ENVIRONMENT_VARIABLE).toBe(process.env.DEPLOY_PREVIEW_ENVIRONMENT_VARIABLE)
  })
})

describe('branch names', () => {
  beforeEach(() => {
    process.env.ENVIRONMENT_VARIABLE = 'PRODUCTION'
    process.env.CONTEXT = 'branch-deploy'
    process.env.BRANCH = 'development'
  })

  it('replaces the environment variable value with suffix', () => {
    process.env.ENVIRONMENT_VARIABLE_DEVELOPMENT = 'STAGING'
  
    onPreBuild({ inputs: { suffix: true } })
  
    expect(process.env.ENVIRONMENT_VARIABLE).toBe(process.env.ENVIRONMENT_VARIABLE_DEVELOPMENT)
  })

  it('replaces the environment variable value with prefix', () => {
    process.env.DEVELOPMENT_ENVIRONMENT_VARIABLE = 'STAGING'
  
    onPreBuild({ inputs: { suffix: false } })
  
    expect(process.env.ENVIRONMENT_VARIABLE).toBe(process.env.DEVELOPMENT_ENVIRONMENT_VARIABLE)
  })

  it('can use dash or forward slash branch name', () => {
    process.env.BRANCH = 'feat/branch'
    process.env.ENVIRONMENT_VARIABLE_FEAT_BRANCH = 'STAGING'
  
    onPreBuild({ inputs: { suffix: true } })
  
    expect(process.env.ENVIRONMENT_VARIABLE).toBe(process.env.ENVIRONMENT_VARIABLE_FEAT_BRANCH)
  })
})

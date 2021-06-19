# netlify-plugin-environment-variables

Replace the value of environment variables on Netlify at build time based on deploy contexts.

## Installation

For file-based installation, install the package first.

```bash
npm install netlify-plugin-environment-variables --save-dev
```

Add the following lines to your `netlify.toml` file.

```toml
[[plugins]]
package = 'netlify-plugin-environment-variables'
```

## Usage

This plugin will replace the value of your environment variables based on deploy contexts. Read more about deploy contexts [here](https://docs.netlify.com/site-deploys/overview/#deploy-contexts).

All the values of environment variables will be automatically replaced by the value environment variables with context suffix.

| contexts        | description                                                           | suffix            |
| --------------- | --------------------------------------------------------------------- | ----------------- |
| Branch deploy   | Deploys from branches that are not the site’s main production branch  | `_BRANCH_DEPLOY`  |
| Deploy preview  | The previews that are build for pull/merge requests                   | `_DEPLOY_PREVIEW` |
| Branch names    | Custom deploy contexts                                                | `_BRANCH_NAME`    |

For example, a `development` branch would trigger this plugin to automatically replace `YOUR_ENVIRONMENT_VARIABLE` with the value of `YOUR_ENVIRONMENT_VARIABLE_DEVELOPMENT` if it exists.

All branch names that contain '-' or '/' will be replaced with '_'. So if you have a `feat/branch` or `feat-branch` branch, it will be changed to `FEAT_BRANCH`.

> For `master` branch or production contexts, no need to setup environment variable with suffix.

If you prefer use a prefix rather than a suffix, set suffix to `false` in the plugins inputs below.

```toml
[[plugins]]
package = 'netlify-plugin-environment-variables'
  [plugins.inputs]
  suffix = false
```

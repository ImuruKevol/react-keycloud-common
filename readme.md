# KeyCloud React Template Common Packages

This package is tested by esbuild, tailwind

## npm install

```shell
npm install keycloud-common --registry=https://git.nanoha.kr/api/v4/projects/$PROJECT_ID/packages/npm/
```

## npm publish

1. github npm login

```shell
npm login --scope=@imurukevol --auth-type=legacy --registry=https://npm.pkg.github.com
# login with username, password
```

2. `~/.npmrc`

```shell
//npm.pkg.github.com/:_authToken=ghp_1234567890
@imurukevol:registry=https://npm.pkg.github.com/
```

3. check package.json

```json
{
  "name": "@imurukevol/react-keycloud-common",
  "version": "0.0.6",
  ...
  "repository": {
    "type": "git",
    "url": "https://github.com/imurukevol/react-keycloud-common.git"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  }
}
```

4. publish

```shell
npm publish
```

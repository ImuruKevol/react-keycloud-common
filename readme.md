# KeyCloud React Template Common Packages

This package is tested by esbuild, tailwind

## npm install

```shell
npm install @imurukevol/react-keycloud-common
```

## npm publish

1. github npm login

```shell
npm login --scope=@imurukevol --auth-type=legacy --registry=https://npm.pkg.github.com
# login with username, password
```

2. `~/.npmrc`

Replace `ghp_1234567890` with your github token.
Replace `@imurukevol` with your github username.

```shell
//npm.pkg.github.com/:_authToken=ghp_1234567890
@imurukevol:registry=https://npm.pkg.github.com/
```

3. check package.json

Check `name`, `version`, `repository`, `publishConfig` in `package.json`.

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

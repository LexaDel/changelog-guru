<p align="center"><img width="600" src="https://cdn.jsdelivr.net/gh/keindev/changelog-guru/media/logo.svg" alt="Changelog-guru logo"></p>

<p align="center">
    <a href="https://travis-ci.org/keindev/changelog-guru"><img src="https://travis-ci.org/keindev/changelog-guru.svg?branch=master" alt="Build Status"></a>
    <a href="https://codecov.io/gh/keindev/changelog-guru"><img src="https://codecov.io/gh/keindev/changelog-guru/branch/master/graph/badge.svg" /></a>
    <a href="https://www.npmjs.com/package/changelog-guru"><img alt="npm" src="https://img.shields.io/npm/v/changelog-guru.svg"></a>
    <a href="https://www.npmjs.com/package/changelog-guru"><img alt="NPM" src="https://img.shields.io/npm/l/changelog-guru.svg"></a>
    <a href="https://snyk.io/test/github/keindev/changelog-guru?targetFile=package.json"><img src="https://snyk.io/test/github/keindev/changelog-guru/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/keindev/changelog-guru?targetFile=package.json" style="max-width:100%;"></a>
</p>

Automated changelog generator:package::zap::clipboard:

> Absolutely customizable a release changelog with helpful plugins

## Install

### Yarn

```console
yarn add changelog-guru
```

### NPM

```console
npm install changelog-guru
```

## Usage

### Commit structure

Changelog-guru can be used either through a command line interface with an optional configuration file, or else through its JavaScript API. Run `changelog --help` to see the available options and parameters.

Create `CHANGELOG.md`:

`changelog`

Create `CHANGELOG.md` and bump package version in your `package.json` file:

`changelog -p`

## Configuration

> Changelog-guru uses [cosmiconfig](https://www.npmjs.com/package/cosmiconfig) and you can configure the module in any way you like described in the documentation.

All options can be configured in the configuration file, this is where `changelog-guru` looks for configuration:

-   `.changelogrc` file in JSON or YAML format
-   `.changelogrc.json` file
-   `.changelogrc.yaml`, `.changelogrc.yml`, or `.changelogrc.js` file
-   `changelog` property in `package.json`
-   `changelog.config.js` file exporting a JS object

For example see [.changelogrc.yaml](.changelogrc.yaml). Also you can use `changelog-guru` with [default](.changelogrc.default.yaml) configuration.

### Provider

| Default  | CLI Override          | API Override         |
| -------- | --------------------- | -------------------- |
| `github` | `--provider <string>` | `provider: <string>` |

The type of service provider to receive information about the project. To set the type of service you want to use, you must:

-   Set `provider: github` or `provider: gitlab` in your configuration file, it's all.
-   Make sure the provider token is available as an environment variable.

Example:

```
export GITHUB_TOKEN="f941e0..."

export GITLAB_TOKEN="f941e0..."
```

> Changelog-guru uses [dotenv](https://www.npmjs.com/package/dotenv) and you can loads environment variables from a `.env`

### Levels of changes

| Default     | CLI Override              | API Override      |
| ----------- | ------------------------- | ----------------- |
| _see below_ | `--changes-major <items>` | `major: string[]` |
| _see below_ | `--changes-minor <items>` | `minor: string[]` |
| _see below_ | `--changes-patch <items>` | `patch: string[]` |

Default level of changes:

```YAML
changes:
    major:
        - break
    minor:
        - feat
        - improve
    patch:
        - fix
        - chore
        - refactor
        - test
        - docs
        - build
        - types
        - style
        - workflow
        - perf
        - revert
```

For a list of change types by level, see [SemVer](https://semver.org/). The commits with the specified types will be distributed by change levels. For example:

```

// Commit message with MINOR changes
feat(Core): add awesome feature

```

The following types of changes are defined by default:

-   **MAJOR** version:
    -   `break` - breaking changes
-   **MINOR** version:
    -   `feat` - new features
    -   `improve` - features improvements
-   **PATCH** version:
    -   `fix` - some bugs fixing
    -   `chore` - minor changes
    -   `refactor` - code refactoring
    -   `test` - add or change tests
    -   `docs` - documentation changes
    -   `build` - package changes, release
    -   `types` - code typing
    -   `style` - `css`/`scss`/_other_, style sheet change
    -   `workflow` - workflow changes
    -   `perf` - performance improvements
    -   `revert` - reverted changes

### Output options

Parameters of the output file. Specify the path to the file and the excluded entities.

Default output options:

```YAML
output:
    filePath: CHANGELOG.md
    exclude:
        authorLogin: ['dependabot-preview[bot]']
        commitType: ['build']
        commitScope: ['deps', 'deps-dev']
        commitSubject: ['merge']
```

#### filePath

File path to write change log to it.

| Default        | CLI Override      | API Override       |
| -------------- | ----------------- | ------------------ |
| `CHANGELOG.md` | `--output <path>` | `filePath: string` |

#### exclude

One way to filter output by ignoring commits with a given type, scope, subject, or from certain authors. To find out about other ways to ignore commits, see the section [Plugins](#plugins)

| Default                                 | CLI Override                 | API Override              |
| --------------------------------------- | ---------------------------- | ------------------------- |
| _[see output example](#output-options)_ | `--exclude-authors<items>`   | `authorLogin: string[]`   |
| _[see output example](#output-options)_ | `--exclude-types <items>`    | `commitType: string[]`    |
| _[see output example](#output-options)_ | `--exclude-scopes <items>`   | `commitScope: string[]`   |
| _[see output example](#output-options)_ | `--exclude-subjects <items>` | `commitSubject: string[]` |

-   **authorLogin**: Excludes authors with the listed logins from the output file.
-   **commitType**: Excludes commits with the listed [types](#commit-structure) from the output file.
-   **commitScope**: Excludes commits with the listed [scopes](#commit-structure) from the output file.
-   **commitSubject**: Excludes commits with the listed [subjects](#commit-structure) from the output file.

### Other CLI options

| Default | CLI             | Description                                                                                                                                      |
| ------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `false` | `--bump`        | Based on data about changes made in the project, forms the next version number and bumps it in `package.json`, see [SemVer](https://semver.org/) |
| -       | `-v, --version` | Show `changelog-guru` package version                                                                                                            |
| -       | `--help`        | Show `changelog-guru` cli options help                                                                                                           |

### Plugins

#### Attention

#### Marker

#### Scope

#### Section

## License

[MIT](LICENSE)

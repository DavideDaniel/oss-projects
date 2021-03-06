# gen-changelogs

* * *

[![CircleCI](https://circleci.com/gh/DavideDaniel/oss-projects/tree/master.svg?style=svg)](https://circleci.com/gh/DavideDaniel/oss-projects/tree/master)

## Install

```bash
$ npm install gen-changelogs --save-dev
# or
$ yarn add gen-changelogs -D
```

## Documentation

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [getCurrentActiveType](#getcurrentactivetype)
    -   [Parameters](#parameters)
-   [shouldContinuePrerelease](#shouldcontinueprerelease)
    -   [Parameters](#parameters-1)
-   [getTypePriority](#gettypepriority)
    -   [Parameters](#parameters-2)
-   [bumpVersion](#bumpversion)
    -   [Parameters](#parameters-3)

### getCurrentActiveType

extract the in-pre-release type in target version

#### Parameters

-   `version` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### shouldContinuePrerelease

if a version is currently in pre-release state,
and if it current in-pre-release type is same as expect type,
it should continue the pre-release with the same type

#### Parameters

-   `version` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `expectType` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### getTypePriority

calculate the priority of release type,
major - 2, minor - 1, patch - 0

#### Parameters

-   `type` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### bumpVersion

determine the recommended version bump

#### Parameters

-   `releaseAs` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a semver release type [major|minor|patch]
-   `preset` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** conventional-changelog preset to use (optional, default `'angular'`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** resolves the determined version bump

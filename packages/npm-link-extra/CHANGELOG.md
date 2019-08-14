# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="4.0.3"></a>
## [4.0.3](https://github.com/projects/DavideDaniel/repos/npm-link-extra/compare/diff?targetBranch=refs%2Ftags%2Fnpm-link-extra@4.0.2&sourceBranch=refs%2Ftags%2Fnpm-link-extra@4.0.3) (2019-08-14)


### Bug Fixes

* correctly thread opts through all related functions ([57c74e3](https://github.com/projects/DavideDaniel/repos/npm-link-extra/commits/57c74e3))




<a name="4.0.2"></a>
## [4.0.2](https://github.com/projects/DavideDaniel/repos/npm-link-extra/compare/diff?targetBranch=refs%2Ftags%2Fnpm-link-extra@4.0.1&sourceBranch=refs%2Ftags%2Fnpm-link-extra@4.0.2) (2019-08-05)


### Bug Fixes

* add basic module snapshot test ([ba630c5](https://github.com/projects/DavideDaniel/repos/npm-link-extra/commits/ba630c5))
* amend jest versions to address testing issues ([8516b4e](https://github.com/projects/DavideDaniel/repos/npm-link-extra/commits/8516b4e))
* remove extraneous dev deps to address security issues ([394f304](https://github.com/projects/DavideDaniel/repos/npm-link-extra/commits/394f304))




<a name="4.0.1"></a>
## [4.0.1](https://github.com/projects/DavideDaniel/repos/npm-link-extra/compare/diff?targetBranch=refs%2Ftags%2Fnpm-link-extra@4.0.0&sourceBranch=refs%2Ftags%2Fnpm-link-extra@4.0.1) (2019-08-05)




**Note:** Version bump only for package npm-link-extra

<a name="4.0.0"></a>
# 4.0.0 (2019-07-20)


### Bug Fixes

* add documentation header ([341c878](https://github.com/projects/DavideDaniel/repos/npm-link-extra/commits/341c878))
* adjust functions for yarn usecase first with better logging ([bba444e](https://github.com/projects/DavideDaniel/repos/npm-link-extra/commits/bba444e))


### Features

* add conv method ([2ba7f77](https://github.com/projects/DavideDaniel/repos/npm-link-extra/commits/2ba7f77))
* ignore packages with -i flag ([63e854f](https://github.com/projects/DavideDaniel/repos/npm-link-extra/commits/63e854f))
* return full pkg version ([3c8d94d](https://github.com/projects/DavideDaniel/repos/npm-link-extra/commits/3c8d94d))
* use a cache.json file to speed up lookups ([19f4afe](https://github.com/projects/DavideDaniel/repos/npm-link-extra/commits/19f4afe))
* use yarn link if yarn and caching to speed through ([dfbe813](https://github.com/projects/DavideDaniel/repos/npm-link-extra/commits/dfbe813))


### BREAKING CHANGES

* as getPackages now contains full package.json, v is now
named version

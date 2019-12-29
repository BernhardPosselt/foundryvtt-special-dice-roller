# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2019-12-28
### Added
- Added support for rolling Vampire the Masquerade 5th Edition dice

## [0.4.0] - 2019-12-28
### Added
- Accept numbers for simple formulas: wwbb can now be written as 2w2b

### Changed

- Removed xdy+zda format in favor of simpler roll formula
- Removed irrelevant failures from l5r roll results

### Security
- Fix possible XSS when entering an invalid roll formula

## [0.3.0] - 2019-12-28
### Added

- Added support for FFG's Genesys and Star Wars dice


## [0.2.0] - 2019-12-27

### Added

- Support for SkyJedi style formulas: /l5r wwwbb will roll 3 skill and 2 ring dice. You can use s and r interchangably as well

### Fixed

- Roll formula whitespace is now correctly removed before parsing
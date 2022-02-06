# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.15.0] - 2021-02-06
### Added
- Mark as 0.9.2 compatible
- Added OVA dice

## [0.14.0] - 2021-05-24
### Fixed
- Register roller in init phase, #28

### Changed
- Require Foundry 0.8.5

## [0.13.0] - 2020-12-15
### Added
- Mark as 0.7.8 compatible
- Added Genesys dice

## [0.12.1] - 2020-10-27
### Added
- Mark as 0.7.5 compatible

## [0.12.0] - 2020-10-02
### Added
- WFRP3 roller, #10, thanks @silentmark, @illotum!
- The One Ring roller, #19, thanks @gblosser42

## [0.11.3] - 2020-06-13
### Fixed
- Do not log undefined to chat console if no roller command was found

## [0.11.2] - 2020-06-10
### Fixed
- Do not explode l5r dice since dice only explode when you keep them. Future implementation will add a way to automatically roll on keep, #13
- Fix compatibility with 0.6.5, #12

## [0.11.1] - 2020-05-31
### Fixed
- Fix + and - in HeXXen 1733 dice
- Add support for 0.6.0

## [0.11.0] - 2020-05-23
### Added
- Added support for rolling HeXXen 1733 dice

## [0.10.1] - 2020-05-19
### Fixed

- Improve HeroQuest monster die images
- Reduce margin to 0 for dice images

## [0.10.0] - 2020-05-18
### Changed

- Depend on 0.5.7 because of style changes

### Fixed
- Increase die size from 25x25 to 40x40 pixels for better readability
- Genesys dice are now show in the following order: proficiency, ability, challenge, difficulty, boost, setback, force

## [0.9.0] - 2020-05-18
### Changed
- Make compatible with 0.5.7
- Genesys dice are now show in the following order: boost, ability, proficiency, setback, difficulty, challenge, force 

### Added

- Support HeroQuest dice
>>>>>>> upstream/master

## [0.8.0] - 2020-04-17
### Changed
- Make compatible with 0.5.5
- Break compatibility with earlier FoundryVTT releases due to API changes

## [0.7.0] - 2020-01-10
### Changed
- Make compatible with 0.4.4

## [0.6.0] - 2020-01-03
### Changed
- Re-rolls are now printed in the original order and highlighted as re-rolled.
- Switch to AGPL license

## [0.5.0] - 2019-12-28
### Added
- Added support for rolling Vampire the Masquerade 5th Edition dice

### Changed
- Renamed module to Special Dice Roller

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

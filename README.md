# L5R Roller

[![Build Status](https://travis-ci.org/BernhardPosselt/l5r-foundryvtt-roller.svg?branch=master)](https://travis-ci.org/BernhardPosselt/l5r-foundryvtt-roller)

A Legend of the 5 Rings dice roller using the images from [SkyJedi's Discord Roller](https://github.com/SkyJedi/FFGNDS-Discord-Dice-Roller)

Also supports Genesys and Fantasy Flight Games Star Wars RPG

# Usage

You can roll a system by starting your message with the following string:

* Legend of the 5 Rings: /l5r
* FFG Star Wars: /sw
* FFG Genesys: /gen

Then supply a dice formula separated with a space. 

This can be either separate letters and for each letter a roll will be made (e.g. ssr would roll 2 skill dice and 1 ring die) or a combination like **ndl+ndl** where n is a number of rolls and l the die letter (e.g. 2dr+1ds would roll 2 ring dice and 1 skill die) 

A full roll example would be **/l5r rrs**.

## Usage L5R

Roll Legend of the 5 Rings 5th edition dice in the chat window. Auto rolls exploding successes and let's you keep/re-roll selected dice.

Use the **/l5r** command using the following dice letters:

* b, r: ring
* s, w: skill

![roller usage](docs/roller.png)

You can choose to either keep or re-roll certain dice. To do that, click on the dice to select them and hit either button. Re-rolled dice are removed from the roll and new rolls are attached at the end.

## Usage Genesys/Star Wars

Usage is similar to L5R but re-rolls and keeping dice is unsupported. Use the **/gen** or **/sw** commands using the following dice letters:

* b: boost
* s: setback
* a: ability
* d: difficulty
* p: proficiency
* c: challenge
* f: force (only sw)
import {IMonoid} from '../lang';
import {Roll} from '../roller';

export enum Dice {
	HEXXEN,
	JANUS,
	SEGNUNG,
	BLUT,
	ELIXIR,
	FLUCH,
}

export enum Faces {
	ERFOLG,
	ESPRITSTERN,
	LEER,
	DOPPELKOPF,
	DOPPELERFOLG,
	BLUT_EINS,
	BLUT_ZWEI,
	BLUT_DREI,
	ELIXIR_EINS,
	ELIXIR_ZWEI,
	ELIXIR_DREI,
	ELIXIR_VIER,
	ELIXIR_FUENF,
	FLUCH_EINS,
	FLUCH_ZWEI,
	FLUCH_DREI,
	FLUCH_VIER,
	FLUCH_FUENF,
}

export const HEXXEN_ROLL_TABLE: Faces[] = [
	Faces.ESPRITSTERN,
	Faces.LEER,
	Faces.LEER,
	Faces.LEER,
	Faces.ERFOLG,
	Faces.ERFOLG,
];

export const JANUS_ROLL_TABLE: Faces[] = [
	Faces.LEER,
	Faces.LEER,
	Faces.LEER,
	Faces.DOPPELKOPF,
	Faces.DOPPELKOPF,
	Faces.DOPPELKOPF,
];

export const SEGNUNG_ROLL_TABLE: Faces[] = [
	Faces.ESPRITSTERN,
	Faces.ESPRITSTERN,
	Faces.LEER,
	Faces.ERFOLG,
	Faces.ERFOLG,
	Faces.DOPPELERFOLG,
];

export const BLUT_ROLL_TABLE: Faces [] = [
	Faces.LEER,
	Faces.BLUT_EINS,
	Faces.BLUT_EINS,
	Faces.BLUT_ZWEI,
	Faces.BLUT_ZWEI,
	Faces.BLUT_DREI,
];

export const ELIXIR_ROLL_TABLE: Faces [] = [
	Faces.ELIXIR_EINS,
	Faces.ELIXIR_ZWEI,
	Faces.ELIXIR_DREI,
	Faces.ELIXIR_VIER,
	Faces.ELIXIR_FUENF,
	Faces.ELIXIR_DREI,
];

export const FLUCH_ROLL_TABLE: Faces [] = [
	Faces.FLUCH_EINS,
	Faces.FLUCH_ZWEI,
	Faces.FLUCH_DREI,
	Faces.FLUCH_VIER,
	Faces.FLUCH_FUENF,
	Faces.FLUCH_DREI,
];

const HEXXENImages = new Map<Faces, string>();
HEXXENImages.set(Faces.ESPRITSTERN, 'hesprit');
HEXXENImages.set(Faces.LEER, 'hblank');
HEXXENImages.set(Faces.ERFOLG, 'herfolg');

const JANUSImages = new Map<Faces, string>();
JANUSImages.set(Faces.LEER, 'jblank');
JANUSImages.set(Faces.DOPPELKOPF, 'jdoppelkopf');

const SEGNUNGImages = new Map<Faces, string>();
SEGNUNGImages.set(Faces.ESPRITSTERN, 'sesprit');
SEGNUNGImages.set(Faces.LEER, 'sblank');
SEGNUNGImages.set(Faces.ERFOLG, 'serfolg');
SEGNUNGImages.set(Faces.DOPPELERFOLG, 'sdoppelerfolg');

const BLUTImages = new Map<Faces, string>();
BLUTImages.set(Faces.LEER, 'bblank');
BLUTImages.set(Faces.BLUT_EINS, 'beins');
BLUTImages.set(Faces.BLUT_ZWEI, 'bzwei');
BLUTImages.set(Faces.BLUT_DREI, 'bdrei');

const ELIXIRImages = new Map<Faces, string>();
ELIXIRImages.set(Faces.ELIXIR_EINS, 'eeins');
ELIXIRImages.set(Faces.ELIXIR_ZWEI, 'ezwei');
ELIXIRImages.set(Faces.ELIXIR_DREI, 'edrei');
ELIXIRImages.set(Faces.ELIXIR_VIER, 'evier');
ELIXIRImages.set(Faces.ELIXIR_FUENF, 'efuenf');

const FLUCHImages = new Map<Faces, string>();
FLUCHImages.set(Faces.FLUCH_EINS, 'feins');
FLUCHImages.set(Faces.FLUCH_ZWEI, 'fzwei');
FLUCHImages.set(Faces.FLUCH_DREI, 'fdrei');
FLUCHImages.set(Faces.FLUCH_VIER, 'fvier');
FLUCHImages.set(Faces.FLUCH_FUENF, 'ffuenf');

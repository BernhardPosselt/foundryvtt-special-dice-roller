export type DiceImageMappings<D, F> = Map<D, Map<F, string>>;

export function getDieImage<D, F>(images: DiceImageMappings<D, F>, die: D, face: F): string {
    const dieImages = images.get(die);
    if (dieImages !== undefined) {
        const image = dieImages.get(face);
        if (image !== undefined) {
            return image;
        } else {
            throw new Error(`Unknown face ${face}`);
        }
    } else {
        throw new Error(`Unknown die ${die}`);
    }
}

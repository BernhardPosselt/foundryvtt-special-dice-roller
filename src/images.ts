export type DiceImageMappings<D, F> = Map<D, Map<F, string>>;

export function getDieImage<D, F>(images: DiceImageMappings<D, F>, die: D, face: F) {
    const dieImages = images.get(die);
    if (dieImages !== undefined) {
        const images = dieImages.get(face);
        if (images !== undefined) {
            return images;
        } else {
            throw new Error(`Unknown face ${face}`);
        }
    } else {
        throw new Error(`Unknown die ${die}`);
    }
}
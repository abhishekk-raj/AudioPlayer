const convertToRGB = (hexCode: string): number[] => {
    hexCode = hexCode.replace('#', '');
    if (hexCode.length !== 6) {
        throw Error('Hex code is not valid');
    }

    const aRgbHex = hexCode.match(/.{1,2}/g);

    return aRgbHex ? [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ]: [];
}

export {convertToRGB};

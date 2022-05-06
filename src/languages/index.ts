export function languageFromCode(
    code: string,
    displayLanguage: string
): string | undefined {
    try {
        return new Intl.DisplayNames([displayLanguage], {
            type: "language"
        }).of(code)
    } catch (e) {
        console.warn(`Invalid language code: ${code} or ${displayLanguage}`, e)

        return code
    }
}

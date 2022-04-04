export function languageFromCode(
    code: string,
    displayLanguage: string = window.navigator.language
): string | undefined {
    return new Intl.DisplayNames([displayLanguage], {
        type: "language"
    }).of(code)
}

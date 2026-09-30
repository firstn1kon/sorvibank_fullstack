export function formatPhoneNumber(phoneString: string) {
    const digits = phoneString.replace(/\D/g, '');

    if (digits.length !== 11) {
        return phoneString;
    }

    return digits.replace(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 ($2) $3-$4-$5');
}

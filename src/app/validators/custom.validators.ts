export function required(control: any) {
    return control.value ? null : { required: true };
}

export function emailValidator(control: any) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(control.value) ? null : { invalidEmail: true };
}

export function minLength(min: number) {
    return (control: any) => {
        return control.value && control.value.length >= min ? null : { minLength: { requiredLength: min, actualLength: control.value.length } };
    };
}
const shorten = (name: string, MAX: number = 10): string => {
    return (name.slice(0, MAX));
}

export { shorten };

type shorten = {
    name: string,
    shortened: boolean,
}
const shorten = (name: string, MAX: number = 10): shorten => {
    if (name.length >= MAX) {
        // keep the first 3 characters and the last 3 characters
        const newName = `${name.slice(0, 3)}...${name.slice(-3)}`;
        return { name: newName, shortened: true }
    }
    return ({ name, shortened: false });
}

export { shorten };

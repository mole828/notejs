function defaultDict(createValue) {
    return new Proxy(Object.create(null), {
        get(storage, property) {
            if (!(property in storage))
                storage[property] = createValue(property);
            return storage[property];
        }
    });
}

arrs = defaultDict(()=>[])
Object.keys(arrs).forEach(console.log)
arrs.a.push('a')
Object.keys(arrs).forEach(console.log)
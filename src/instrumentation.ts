function createServerStorageShim(): Storage {
	const store = new Map<string, string>();

	return {
		get length() {
			return store.size;
		},
		clear() {
			store.clear();
		},
		getItem(key: string) {
			return store.get(key) ?? null;
		},
		key(index: number) {
			return Array.from(store.keys())[index] ?? null;
		},
		removeItem(key: string) {
			store.delete(key);
		},
		setItem(key: string, value: string) {
			store.set(key, value);
		}
	};
}

export async function register() {
	if (
		typeof globalThis.localStorage === 'object' &&
		typeof globalThis.localStorage?.getItem !== 'function'
	) {
		Object.defineProperty(globalThis, 'localStorage', {
			value: createServerStorageShim(),
			configurable: true
		});
	}
}

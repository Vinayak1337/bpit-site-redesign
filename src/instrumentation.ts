export async function register() {
	if (process.env.NEXT_RUNTIME === 'nodejs') {
		const store = new Map<string, string>();

		const safeStorage: Storage = {
			getItem(key: string): string | null {
				return store.get(key) ?? null;
			},
			setItem(key: string, value: string): void {
				store.set(key, String(value));
			},
			removeItem(key: string): void {
				store.delete(key);
			},
			clear(): void {
				store.clear();
			},
			get length(): number {
				return store.size;
			},
			key(index: number): string | null {
				return [...store.keys()][index] ?? null;
			}
		};

		Object.defineProperty(globalThis, 'localStorage', {
			value: safeStorage,
			writable: true,
			configurable: true
		});

		Object.defineProperty(globalThis, 'sessionStorage', {
			value: safeStorage,
			writable: true,
			configurable: true
		});
	}
}

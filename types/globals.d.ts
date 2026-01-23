export {};

export type Roles = "admin" | "user";

declare global {
	interface CustomjwtSessionClaims {
		metadata: {
			role?: Roles;
		};
	}
}

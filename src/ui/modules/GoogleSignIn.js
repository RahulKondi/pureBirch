/* @flow */

type Account = {
	id: ?string;
	display_name: ?string;
	email: ?string;
	id_token: ?string;
	auth_code: ?string;
	photo_url?: string;
}

export default class Facebook {
	static signIn: () => Promise<Account>;
	static signOut: () => Promise<boolean>;
	static revokeAccess: () => Promise<boolean>;
}

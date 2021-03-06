/* @flow */

type AccessToken = {
	access_token: ?string;
	user_id: ?string;
	expires: ?number;
	permissions_granted: Array<string>;
	permissions_declined: Array<string>;
}

export default class Facebook {
	static logInWithReadPermissions: (permissions: Array<string>) => Promise<AccessToken>;
	static logInWithPublishPermissions: (permissions: Array<string>) => Promise<AccessToken>;
	static logOut: () => Promise<boolean>;
	static getCurrentAccessToken: () => Promise<AccessToken>;
	static sendGraphRequest: (
		method: 'GET' | 'POST' | 'DELETE',
		path: string,
		params: { [key: string]: string }
	) => void;
}

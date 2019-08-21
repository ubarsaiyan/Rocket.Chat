import { Meteor } from 'meteor/meteor';
import { createClient } from 'webdav';

import { settings } from '../../../settings';
import { getWebdavCredentials } from './getWebdavCredentials';
import { WebdavAccounts } from '../../../models';

Meteor.methods({
	async getWebdavFilePreview(accountId, path) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid User', { method: 'getWebdavFilePreview' });
		}

		if (!settings.get('Webdav_Integration_Enabled')) {
			throw new Meteor.Error('error-not-allowed', 'WebDAV Integration Not Allowed', { method: 'getWebdavFilePreview' });
		}

		const account = WebdavAccounts.findOne({ _id: accountId, user_id: Meteor.userId() });
		if (!account) {
			throw new Meteor.Error('error-invalid-account', 'Invalid WebDAV Account', { method: 'getWebdavFilePreview' });
		}

		try {
			const cred = getWebdavCredentials(account);
			const client = createClient(account.server_url, cred);
			console.log(path);
			const res = await client.customRequest({
				url: `https://nextcloud.utkarshbarsaiyan.com/index.php/core/preview.png?file=${ path }&x=256&y=256`,
				method: 'GET',
				responseType: 'arraybuffer',
			});
			console.log('******************', res.data, '************************');
			return { success: true, data: res.data };
		} catch (error) {
			console.log(error);
			throw new Meteor.Error('could-not-access-webdav', { method: 'getWebdavFilePreview' });
		}
	},
});

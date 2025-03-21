import {AuthModel} from './auth.model';
import {AddressModel} from './address.model';
import {SocialNetworksModel} from './social-networks.model';

export class UserModel extends AuthModel {
    id: number;
    name: string;
    password: string;
    remember_token: string;
    avatar_url: string;
    email: string;
    facebook_id: string;
    avatar: string;
    hashtag: string;
    role: string;
    agency_code: string;

    setUser(_user: unknown) {
        const user = _user as UserModel;
        this.id = user.id;
        this.name = user.name || '';
        this.password = user.password || '';
        this.remember_token = user.remember_token || '';
        this.avatar_url = user.avatar_url || '';
        this.facebook_id = user.facebook_id || '';
        this.avatar = user.avatar || '';
        this.hashtag = user.hashtag || '';
        this.agency_code = user.agency_code || '';
    }
}

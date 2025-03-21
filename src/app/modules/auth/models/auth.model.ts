export class AuthModel {
    access_token: string;
    user: string;

    setAuth(auth: AuthModel) {
        this.access_token = auth.access_token;
    }
}

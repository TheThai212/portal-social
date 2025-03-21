import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js'
import { JSEncrypt } from 'jsencrypt';
import { Observable, tap } from 'rxjs';
import forge from "node-forge";

@Injectable({
    providedIn: 'root'
})
export class EncryptionService {

    private publicKey: string;
    private privateKey: string;
    private jsEncrypt: JSEncrypt;
    private aesKey: string;

    // plainText: string = ''; // Plaintext
    cypherText: string = '123'; // Encrypted ciphertext
    // $encrypt: any; // JSEncrypt Instance

    constructor(private http: HttpClient) {
        this.jsEncrypt = new JSEncrypt();
        this.initializeEncryption();

        // const key = CryptoJS.enc.Hex.parse("8b246378ed02ac26c4e1d02928bee70d5ade2471ac34c2f0a23131c838de5f79");
        // const iv = CryptoJS.enc.Hex.parse("9bbdd6c68d3df3adfb062c8f0ec2c677");

        // const encrypted = CryptoJS.AES.encrypt("Hello, World!", key, {
        //     mode: CryptoJS.mode.CBC,
        //     padding: CryptoJS.pad.Pkcs7,
        //     iv: iv
        // });


        // const encryptedJson = CryptoJS.AES.encrypt(`{"post_url":"123"}`, key, {
        //     mode: CryptoJS.mode.CBC,
        //     padding: CryptoJS.pad.Pkcs7,
        //     iv: iv
        // });

    }

    private initializeEncryption() {
        // this.getPublicKey().subscribe();

        this.publicKey = `-----BEGIN PUBLIC KEY-----
            MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqq1YHbb4cU3DalJ2mcsN
            Bwg1Ck917JT7fY2v3S3llsOQ5MN40AinTCfYpE1XzmejxQWgankCSWIG0eXoZDvM
            jngk8CMXoL337krcKoy6eWVgPge9DN6WuXQPzHHUsJyzU8RSr0PM7YHjGPt51xP4
            8Ym5h/Lu363+WZ/6VsuojcTZMIJi3jKJzPT2QEpffLviEiKWQ8hb18AxxtoScW0T
            QPuru6dDJtMboaw2VUUvXIJk+irl8XtcY0by3X34EGOIAz20Ay/dygAnOEh4Ub2A
            Sn1OYvZ1a/b8hSJh9B3W1S2rN9BPzy3vGM3eA4UkCRhh47LVbtZp8cklmSjMtFhd
            HwIDAQAB
            -----END PUBLIC KEY-----`;

        this.privateKey = `-----BEGIN PRIVATE KEY-----
            MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqrVgdtvhxTcNq
            UnaZyw0HCDUKT3XslPt9ja/dLeWWw5Dkw3jQCKdMJ9ikTVfOZ6PFBaBqeQJJYgbR
            5ehkO8yOeCTwIxegvffuStwqjLp5ZWA+B70M3pa5dA/McdSwnLNTxFKvQ8ztgeMY
            +3nXE/jxibmH8u7frf5Zn/pWy6iNxNkwgmLeMonM9PZASl98u+ISIpZDyFvXwDHG
            2hJxbRNA+6u7p0Mm0xuhrDZVRS9cgmT6KuXxe1xjRvLdffgQY4gDPbQDL93KACc4
            SHhRvYBKfU5i9nVr9vyFImH0HdbVLas30E/PLe8Yzd4DhSQJGGHjstVu1mnxySWZ
            KMy0WF0fAgMBAAECggEAQ8fMbxyLRJ/fw7kU/ZWMSmchfUM6LyapS1654SoJe9qV
            j6vrLh7Jpa5LVFCc1s0E1kkaQD5nQJJL6A6YQDoZTdj7vlwJVZ4ruHgFQGab5Xrz
            gh7bnqFFFUg4v/XSxAKvGsykE5Nm7kl/URwJcnctjWqnAgzhfXYhRSGJru95NDc7
            Bbek2Knj+IFnFabXI+cV1uPyU6ZXPALq/st/Im/Qf4hTv12hfBVvHaRE3ZErXHLt
            gyZ+QwyR7PBedXW+OtZRMjw/1ZWaaSmBDFymSkojKkB6cSyU6TW2WSrJSLy7UWFV
            H8EPjNSMBV7WJXuOwhUTG8LYOnuOFI/KmbvfmJKvfQKBgQDU+nIz7coDa4/i8pZD
            LsxHd1FCMWMSt2IAtmi6AjgwKl5apZVIzYZ9i0yAs3vET+qUdNHNyIkfZdzst/Ml
            E9kSErnj785QMDuHF/Vdrc5MA/UrJXrdcwjpiUWBnAB/8clEAkRHl+RCBaTxeust
            jaoJmPQs14/jBfax0P8YcULeqwKBgQDNJ2pjziWQbJWswaXNES5OjpVqFs41ch/U
            ngYpbuCpMwXhwk6UbLx8nUNDap2YECVcmfHf+b6LcpvVzcM/S9WX+NT1zca8yC5A
            7HdztQU80bx2xaEbmLn8gmy0oxrniEdWXSuG3zgUqPDfY682HtrjvYmqoPJQfKVE
            tzw1I/RrXQKBgC/7gLE8WG/u0srxlnLqXzGWqyL7l3OHBzhb4DpP97K6SOmpNnnh
            e/Ra5tB0H2U6EAKEUyRGksYVH/Hg+5GV6CjPOTwmMdgVFcQ43JnPZ5PurFSdLBIq
            MY7T02oA6IfqxEpjLFjo2o8ZUHDrHYL00KM654AWzJ78H/ktudsa4VLjAoGAc1AV
            X9YOjThLhRgvvq1KjwNb/o6lB6uHMrZEFmPpSZGRW80g6BKae5zVov45aLCin4M0
            TkWNkcowx6NpfJl+jHZkFWm9rH0Eap+/oLz+HapyOXxqSx20ZLdWrM4FIGEcX/Hs
            tlmfpxUylw3r/Qqo1FvEFrFyokT9jDtGT0RPbU0CgYEAz+WLFmngns+fBcZdzfSx
            6FBgAEMfTarmNjPEULvq6JzBfqBy/15OynVue48NVFd+h7h7bR2wJsjlg6ate6ZZ
            XNDWJoduieGf5+jxCbbAyYZUfTVkORJwfnGeE1fP/88y/L+UbkbCn699MWtrRFTN
            i6JMZKbkw2lP18VTAJ/wFjA=
            -----END PRIVATE KEY-----`;

        this.jsEncrypt.setPublicKey(this.publicKey);
        this.jsEncrypt.setPrivateKey(this.privateKey);

        this.generateNewAesKey();
    }

    private encrypt() {
        this.jsEncrypt.setPublicKey(this.publicKey);
        // this.cypherText = this.jsEncrypt.encrypt(this.aesKey);
        // this.cypherText = btoa(this.jsEncrypt.encrypt(this.aesKey));

        return this.jsEncrypt.encrypt(this.aesKey);
    }

    private decrypt() {
        this.jsEncrypt.setPrivateKey(this.privateKey);
        // this.plainText = this.jsEncrypt.decrypt(atob(this.cypherText));

        console.log('cypherText', this.cypherText);
        return this.jsEncrypt.decrypt(this.cypherText);
    }

    private getPublicKey(): Observable<any> {
        return this.http.get<{
            public_key: string; key: string
}>('http://localhost:8881/api/encryption/public-key')
            .pipe(tap(response => {

                console.log(response)
                this.publicKey = response?.public_key;

                // this.publicKey = require('/Users/thethai/Documents/html/portal-social-challenge/public.key');
                this.jsEncrypt.setPublicKey(this.publicKey);
            }));
    }

    private generateNewAesKey(): void {
        this.aesKey = CryptoJS.lib.WordArray.random(256/8).toString();


        console.log(this.aesKey);
    }

    private generateIV(): string {
        // return '9bbdd6c68d3df3adfb062c8f0ec2c677';
        return CryptoJS.lib.WordArray.random(16).toString();
    }

    public encryptPayload(data: any): any {
        try {
            const jsonStr = JSON.stringify({ dataJson: data });
            const key = CryptoJS.enc.Hex.parse(this.aesKey);
            const iv = CryptoJS.enc.Hex.parse(this.generateIV());

            const encrypted = CryptoJS.AES.encrypt(jsonStr, this.aesKey);

            console.log(CryptoJS.AES.encrypt('my message', 'secret key 123').toString());

            const encryptedKey = this.jsEncrypt.encrypt(this.aesKey);

            return {
                data: encrypted.toString(),
                headers: {
                    'X-Encrypt': encryptedKey,
                    'X-Key': this.aesKey,
                    'X-IV': iv.toString()
                }
            };
        } catch (error) {
            console.error('Lỗi mã hóa:', error);
            return data;
        }
    }

    public decryptPayload(encryptedData: string, aesKey: string, iv: string): any {
        try {
            const decryptedBytes = CryptoJS.AES.decrypt(
                encryptedData,
                aesKey,
                {
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7,
                    iv: CryptoJS.enc.Hex.parse(iv)
                }
            );

            const decryptedText = atob(decryptedBytes.toString(CryptoJS.enc.Utf8));

            // Parse chuỗi JSON
            return (decryptedText);
        } catch (error) {
            console.error('Lỗi giải mã:', error);
            return null;
        }
    }
}

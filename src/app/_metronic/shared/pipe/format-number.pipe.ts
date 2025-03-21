import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'formatNumber',
    standalone: true
})
export class FormatNumberPipe implements PipeTransform {
    transform(value: number): string {
        const SI_POSTFIXES: string[] = ["", "K", "M", "G", "T", "P", "E"];
        const sign: "" | "-1" = value < 0 ? '-1' : '';
        const absNumber: number = Math.abs(value);
        const tier: number = Math.log10(absNumber) / 3 | 0;
        if (tier == 0) return `${absNumber}`;
        const postfix: string = SI_POSTFIXES[tier];
        const scale: number = Math.pow(10, tier * 3);
        const scaled: number = absNumber / scale;
        const floored: number = Math.floor(scaled * 10) / 10;
        let str: string = floored.toFixed(1);
        str = (/\.0$/.test(str)) ? str.substr(0, str.length - 2) : str;
        return `${sign}${str}${postfix}`;
    }


}

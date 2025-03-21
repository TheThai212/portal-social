import {Pipe, PipeTransform} from "@angular/core";
import moment from "moment/moment";

@Pipe({
    name: "transferHour",
    standalone: true
})
export class TransferHourPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value) {
            const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
            if (seconds < 29)
                return "Vừa xong";
            const intervals: { [key: string]: number } = {
                "năm": 31536000,
                "tháng": 2592000,
                "tuần": 604800,
                "ngày": 86400,
                "giờ": 3600,
                "phút": 60,
                "giây": 1
            };
            let counter;
            for (const i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0)
                    if (counter === 1) {
                        return counter + " " + i + " trước";
                    } else {
                        return counter + " " + i + " trước";
                    }
            }
        }
        return value;
    }

}

import {Directive, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateRange} from './daterange.class';
import moment from "moment/moment";

declare var $: any;

@Directive({
    standalone: true,
    selector: '[appDateRange]'
})

export class DateRangeDirective implements OnInit {

    @Input() drops = 'down';
    @Input() initRange: any;
    @Input() limit: number;
    @Input() singleDate = false;
    @Input() showRanges = true;
    @Input() minDate: any;
    @Input() infinity = false;
    @Output() selected: any = new EventEmitter();
    dateRange: DateRange = new DateRange({});

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        const start_of_week = moment().startOf('week').add(1, 'days');
        const end_of_week = moment();
        const start_of_last_week = moment().subtract(1, 'week').startOf('week').add(1, 'days');
        const end_of_last_week = moment().subtract(1, 'week').endOf('week').startOf('day').add(1, 'days');
        if (start_of_week > moment()) {
            start_of_week.subtract(7, 'days');
            start_of_last_week.subtract(7, 'days');
            end_of_last_week.subtract(7, 'days');
        }

        let startDate = moment().startOf('day');
        let endDate = moment().startOf('day');
        if (typeof this.initRange === 'number') {
            startDate.subtract(this.initRange, 'days');
        } else if (this.initRange === 'week') {
            startDate = start_of_week;
            endDate = end_of_week;
        } else if (this.initRange === 'month') {
            startDate = moment().startOf('month');
            endDate = moment();
        } else if (this.initRange === 'quarter') {
            startDate = moment().startOf('quarter');
            endDate = moment();
        }

        const options: any = {
            startDate: startDate,
            endDate: endDate,
            maxDate: this.infinity ? null : endDate,
            showDropdowns: true,
            showWeekNumbers: true,
            timePicker: false,
            singleDatePicker: this.singleDate,
            timePickerIncrement: 0,
            autoApply: true,
            timePicker12Hour: true,
            locale: {
                format: 'DD/MM/YYYY',
                applyLabel: 'Apply',
                cancelLabel: 'Cancel',
                fromLabel: 'From',
                toLabel: 'To',
                customRangeLabel: 'Custom',
                daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                    'September', 'October', 'November', 'December'],
                firstDay: 1
            },
            opens: 'right',
            drops: this.drops,
            buttonClasses: ['btn', 'btn-sm'],
            applyClass: 'btn-primary',
            cancelClass: 'btn-default',
            separator: ' - '
        };
        if (this.showRanges) {
            options['ranges'] = {
                'Today': [moment().startOf('day'), moment().startOf('day')],
                'Yesterday': [moment().startOf('day').subtract(1, 'days'), moment().startOf('day').subtract(1, 'days')],
                'This Week': [start_of_week, end_of_week],
                'Last Week': [start_of_last_week, end_of_last_week],
                'This Month': [moment().startOf('month'), moment()],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month').startOf('day')],
                'This Quarter': [moment().startOf('quarter'), moment()],
                'Last Quarter': [moment().startOf('quarter').subtract(1, 'quarters'), moment().startOf('quarter')
                    .subtract(1, 'quarters').endOf('quarter').startOf('day')]
            };
        }
        if (this.limit) {
            options["dateLimit"] = {day: this.limit};
        }
        if (!!this.minDate) {
            options['minDate'] = this.minDate;
        }

        $(this.elementRef.nativeElement)
            .daterangepicker(options, this.dateCallback.bind(this));

        this.dateRange.startDate = startDate.format('YYYY-MM-DD');
        this.dateRange.endDate = endDate.format('YYYY-MM-DD');
        if (endDate.diff(startDate, 'days') > 93) {
            this.dateRange.startDate = moment().startOf('day').format('YYYY-MM-DD');
            this.dateRange.endDate = moment().startOf('day').format('YYYY-MM-DD');
            this.selected.emit(this.dateRange);
        } else {
            this.selected.emit(this.dateRange);
        }
    }

    dateCallback(start: any, end:any) {
        this.dateRange.startDate = start.format('YYYY-MM-DD');
        this.dateRange.endDate = end.format('YYYY-MM-DD');
        if (end.diff(start, 'days') > 93) {
            this.dateRange.startDate = moment().startOf('day').format('YYYY-MM-DD');
            this.dateRange.endDate = moment().startOf('day').format('YYYY-MM-DD');
            this.selected.emit(this.dateRange);
        } else {
            this.selected.emit(this.dateRange);
        }
    }
}

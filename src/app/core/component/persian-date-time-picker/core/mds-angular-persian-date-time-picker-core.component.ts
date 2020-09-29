﻿import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Mds} from 'mds.persian.datetime';
import {TemplateTypeEnum} from '../classes/enums';
import {
    IMdsAngularDateTimePickerDate,
    IMdsAngularDateTimePickerDay,
    IMdsAngularDateTimePickerRangeDate
} from '../classes/interfaces';
import {MdsDatetimePickerUtility} from '../classes/mds-datetime-picker.utility';
import {MdsDatetimePickerResourcesService} from '../service/mds-datetime-picker-resources.service';
import PersianDateTime = Mds.PersianDateTime;
import PersianDayOfWeek = Mds.PersianDayOfWeek;
import GregorianDayOfWeek = Mds.GregorianDayOfWeek;

@Component({
    selector: 'app-mds-datetime-picker-core',
    templateUrl: './mds-angular-persian-date-time-picker-core.component.html',
    styleUrls: ['./mds-angular-persian-date-time-picker-core.component.css'],
    animations: [
        trigger('daysStateName',
            [
                transition('void => *', [
                    style({transform: 'rotateY(90deg)'}),
                    animate('200ms ease-in')
                ])
            ]),
        trigger('monthAndYearSelectorVisibility',
            [
                state('visible', style({opacity: 1, transform: 'rotateY(0deg)'})),
                state('hidden', style({opacity: 0, transform: 'rotateY(90deg)'})),
                transition('hidden => visible', [animate('0.2s ease-in')]),
                transition('visible => hidden', [animate('0.2s ease-out')])
            ])
    ]
})
export class MdsAngularPersianDateTimePickerCoreComponent implements OnInit {

    constructor(private resourcesService: MdsDatetimePickerResourcesService) {
    }

    private initialized = false;
    private _persianChar = true;
    private _isPersian = true;
    private _rangeSelector = true;
    private _timePicker = true;

    // @Input() initialValue = '';
    @Input() templateType: TemplateTypeEnum = TemplateTypeEnum.bootstrap;

    @Input()
    get rangeSelector(): boolean {
        return this._rangeSelector;
    }

    set rangeSelector(value: boolean) {
        if (this._rangeSelector === value) {
            return;
        }
        this._rangeSelector = value;
        this.selectedDateTime = null;
        this.selectedStartDateTime = null;
        this.selectedEndDateTime = null;
        this.timePicker = !value;
        if (!this.initialized) {
            return;
        }
        this.updateMonthDays();
    }

    @Input()
    get timePicker(): boolean {
        return this._timePicker;
    }

    set timePicker(value: boolean) {
        if (this._timePicker === value) {
            return;
        }
        this._timePicker = value;
        if (!this.initialized) {
            return;
        }
        this.updateMonthDays();
    }

    /**
     * فرمت پیش فرض 1393/09/14   13:49:40
     * yyyy: سال چهار رقمی
     * yy: سال دو رقمی
     * MMMM: نام فارسی ماه
     * MM: عدد دو رقمی ماه
     * M: عدد یک رقمی ماه
     * dddd: نام فارسی روز هفته
     * dd: عدد دو رقمی روز ماه
     * d: عدد یک رقمی روز ماه
     * HH: ساعت دو رقمی با فرمت 00 تا 24
     * H: ساعت یک رقمی با فرمت 0 تا 24
     * hh: ساعت دو رقمی با فرمت 00 تا 12
     * h: ساعت یک رقمی با فرمت 0 تا 12
     * mm: عدد دو رقمی دقیقه
     * m: عدد یک رقمی دقیقه
     * ss: ثانیه دو رقمی
     * s: ثانیه یک رقمی
     * fff: میلی ثانیه 3 رقمی
     * ff: میلی ثانیه 2 رقمی
     * f: میلی ثانیه یک رقمی
     * tt: ب.ظ یا ق.ظ
     * t: حرف اول از ب.ظ یا ق.ظ
     **/
    @Input() format = '';

    @Output() dateChanged = new EventEmitter<IMdsAngularDateTimePickerDate>();
    @Output() rangeDateChanged = new EventEmitter<IMdsAngularDateTimePickerRangeDate>();

    @Input()
    get persianChar(): boolean {
        return this._persianChar;
    }

    set persianChar(value: boolean) {
        if (this._persianChar === value) {
            return;
        }
        this._persianChar = value;
        this._yearString = '';
        this.resetMonthDaysWithContent();
    }

    @Input()
    get isPersian(): boolean {
        return this._isPersian;
    }

    set isPersian(value: boolean) {
        if (this._isPersian === value) {
            return;
        }
        this._isPersian = value;
        this._monthName = '';
        this._monthNames = [];
        this._weekdayNames = [];
        this._resources = null;
        this._year = this._month = 0;
        this._yearString = this._monthName = '';
        if (this.dateTime != null) {
            this.updateYearsList();
            this.updateMonthDays();
        }
    }

    private get persianStartDayOfMonth(): PersianDayOfWeek {
        return this.persianDateTime.startDayOfMonthDayOfWeek;
    }

    private get gregorianStartDayOfMonth(): GregorianDayOfWeek {
        return new Date(this.dateTime.getFullYear(), this.dateTime.getMonth(), 1).getDay() as GregorianDayOfWeek;
    }

    get getSelectedDate(): IMdsAngularDateTimePickerDate {
        return this.getSelectedDateObject;
    }

    get getSelectedRangeDates(): IMdsAngularDateTimePickerRangeDate {
        return this.getSelectedRangeDatesObject;
    }

    private get dateTime(): Date {
        return this._dateTime;
    }

    private set dateTime(dateTime: Date) {
        this._dateTime = dateTime == null ? new Date() : new Date(dateTime);
        this._persianDateTime = null;
        this._year = this._month = 0;
        this._hour = this._minute = this._second = 0;
        this._hourString = this._minuteString = this._secondString = '';
        this._yearString = this._monthName = '';
    }

    private get persianDateTime(): PersianDateTime {
        if (this.dateTime == null) {
            return null;
        }
        if (this._persianDateTime != null) {
            return this._persianDateTime;
        }
        this._persianDateTime = new PersianDateTime(this.dateTime);
        return this._persianDateTime;
    }

    private get selectedDateTime(): Date {
        return this._selectedDateTime;
    }

    private set selectedDateTime(dateTime: Date) {
        this._selectedDateTime = dateTime == null ? null : new Date(dateTime);
        this._IMdsAngularDateTimePickerDate = null;
        this._selectedPersianDateTime = null;
        if (this.rangeSelector || !this.timePicker) {
            this.clearTime(dateTime);
        }
    }

    private get selectedPersianDateTime(): PersianDateTime {
        if (this._selectedPersianDateTime != null) {
            return this._selectedPersianDateTime;
        }
        this._selectedPersianDateTime = new PersianDateTime(this.selectedDateTime);
        return this._selectedPersianDateTime;
    }

    private get selectedStartDateTime(): Date {
        return this._selectedStartDateTime;
    }

    private set selectedStartDateTime(dateTime: Date) {
        this._selectedStartDateTime = dateTime == null ? null : new Date(dateTime);
        this._selectedRangeDatesObject = null;
        this._selectedPersianStartDateTime = null;
        this.clearTime(dateTime);
    }

    private get selectedPersianStartDateTime(): PersianDateTime {
        if (this._selectedPersianStartDateTime != null) {
            return this._selectedPersianStartDateTime;
        }
        this._selectedPersianStartDateTime = new PersianDateTime(this.selectedStartDateTime);
        return this._selectedPersianStartDateTime;
    }

    private get selectedEndDateTime(): Date {
        return this._selectedEndDateTime;
    }

    private set selectedEndDateTime(dateTime: Date) {
        this._selectedEndDateTime = dateTime == null ? null : new Date(dateTime);
        this._selectedRangeDatesObject = null;
        this._selectedPersianEndDateTime = null;
        this.clearTime(dateTime);
    }

    private get selectedPersianEndDateTime(): PersianDateTime {
        if (this._selectedPersianEndDateTime != null) {
            return this._selectedPersianEndDateTime;
        }
        this._selectedPersianEndDateTime = new PersianDateTime(this.selectedEndDateTime);
        return this._selectedPersianEndDateTime;
    }

    get resources(): any {
        if (this._resources != null) {
            return this._resources;
        }
        if (this.isPersian) {
            this._resources = this.resourcesService.persianResources;
        } else {
            this._resources = this.resourcesService.englishResources;
        }
        return this._resources;
    }

    get year(): number {
        if (this._year > 0) {
            return this._year;
        }
        this._year = this.isPersian
            ? this.persianDateTime.year
            : this.dateTime.getFullYear();
        return this._year;
    }

    get yearString(): string {
        if (this._yearString !== '') {
            return this._yearString;
        }
        this._yearString = this.persianChar
            ? MdsDatetimePickerUtility.toPersianNumber(this.year.toString())
            : this.year.toString();
        return this._yearString;
    }

    get month(): number {
        if (this._month > 0) {
            return this._month;
        }
        this._month = this.isPersian
            ? PersianDateTime.getPersianMonthIndex(this.persianDateTime.monthName)
            : this.dateTime.getMonth();
        return this._month;
    }

    get monthName(): string {
        if (this._monthName !== '') {
            return this._monthName;
        }
        this._monthName = this.isPersian
            ? this.persianDateTime.monthName
            : PersianDateTime.getGregorianMonthNames[this.month];
        return this._monthName;
    }

    get monthNames(): string[] {
        if (this._monthNames != null && this._monthNames.length > 0) {
            return this._monthNames;
        }
        if (this.isPersian) {
            const allPersianMonths = PersianDateTime.getPersianMonthNames;
            this._monthNames = [
                allPersianMonths[2], allPersianMonths[1], allPersianMonths[0],
                allPersianMonths[5], allPersianMonths[4], allPersianMonths[3],
                allPersianMonths[8], allPersianMonths[7], allPersianMonths[6],
                allPersianMonths[11], allPersianMonths[10], allPersianMonths[9]
            ];
        } else {
            this._monthNames = PersianDateTime.getGregorianMonthNames;
        }
        return this._monthNames;
    }

    get hour(): number {
        this._hour = this.dateTime.getHours();
        return this._hour;
    }

    get hourString(): string {
        this._hourString = this.hour.toString();
        if (this.persianChar) {
            this._hourString = MdsDatetimePickerUtility.toPersianNumber(this._hourString);
        }
        return this._hourString;
    }

    get minute(): number {
        this._minute = this.dateTime.getMinutes();
        return this._minute;
    }

    get minuteString(): string {
        this._minuteString = this.minute.toString();
        if (this.persianChar) {
            this._minuteString = MdsDatetimePickerUtility.toPersianNumber(this._minuteString);
        }
        return this._minuteString;
    }

    get second(): number {
        this._second = this.dateTime.getSeconds();
        return this._second;
    }

    get secondString(): string {
        this._secondString = this.second.toString();
        if (this.persianChar) {
            this._secondString = MdsDatetimePickerUtility.toPersianNumber(this._secondString);
        }
        return this._secondString;
    }

    get weekdayNames(): string[] {
        if (this._weekdayNames != null && this._weekdayNames.length > 0) {
            return this._weekdayNames;
        }
        if (this.isPersian) {
            // حروف اول نام های روز هفته شمسی
            const persianWeekDayNames = PersianDateTime.getPersianWeekdayNames;
            this._weekdayNames = [
                persianWeekDayNames[6][0], persianWeekDayNames[5][0], persianWeekDayNames[4][0],
                persianWeekDayNames[3][0], persianWeekDayNames[2][0], persianWeekDayNames[1][0],
                persianWeekDayNames[0][0]
            ];
        } else {
            const gregorianWeekDayNames = PersianDateTime.getGregorianWeekdayNames;
            this._weekdayNames = [
                gregorianWeekDayNames[1][0] + gregorianWeekDayNames[1][1],
                gregorianWeekDayNames[2][0] + gregorianWeekDayNames[2][1],
                gregorianWeekDayNames[3][0] + gregorianWeekDayNames[3][1],
                gregorianWeekDayNames[4][0] + gregorianWeekDayNames[4][1],
                gregorianWeekDayNames[5][0] + gregorianWeekDayNames[5][1],
                gregorianWeekDayNames[6][0] + gregorianWeekDayNames[6][1],
                gregorianWeekDayNames[0][0] + gregorianWeekDayNames[0][1]
            ];
        }
        return this._weekdayNames;
    }

    private get getSelectedDateObject(): IMdsAngularDateTimePickerDate {
        if (this.selectedDateTime == null) {
            return null;
        }
        if (this._IMdsAngularDateTimePickerDate != null) {
            return this._IMdsAngularDateTimePickerDate;
        }
        const format = this.getDateTimeFormat();
        if (this.isPersian) {
            this._IMdsAngularDateTimePickerDate = {
                year: this.selectedPersianDateTime.year,
                month: this.selectedPersianDateTime.month,
                day: this.selectedPersianDateTime.day,
                hour: this.selectedPersianDateTime.hour,
                minute: this.selectedPersianDateTime.minute,
                second: this.selectedPersianDateTime.second,
                millisecond: this.selectedPersianDateTime.millisecond,
                formatString: this.selectedPersianDateTime.toString(format),
                utcDateTime: this.selectedDateTime
            };
        } else {
            this._IMdsAngularDateTimePickerDate = {
                year: this.selectedDateTime.getFullYear(),
                month: this.selectedDateTime.getMonth(),
                day: this.selectedDateTime.getDate(),
                hour: this.selectedDateTime.getHours(),
                minute: this.selectedDateTime.getMinutes(),
                second: this.selectedDateTime.getSeconds(),
                millisecond: this.selectedDateTime.getMilliseconds(),
                formatString: MdsDatetimePickerUtility.dateTimeToString(this.selectedDateTime, format),
                utcDateTime: this.selectedDateTime
            };
        }
        if (this.persianChar) {
            this._IMdsAngularDateTimePickerDate.formatString =
                MdsDatetimePickerUtility.toPersianNumber(this._IMdsAngularDateTimePickerDate.formatString);
        } else {
            this._IMdsAngularDateTimePickerDate.formatString =
                MdsDatetimePickerUtility.toEnglishString(this._IMdsAngularDateTimePickerDate.formatString);
        }
        return this._IMdsAngularDateTimePickerDate;
    }

    get getSelectedDay(): number {
        if (this.getSelectedDateObject == null || this.rangeSelector) {
            return 0;
        }
        return this.getSelectedDateObject.day;
    }

    private get getSelectedRangeDatesObject(): IMdsAngularDateTimePickerRangeDate {
        if (!this.rangeSelector || this.selectedStartDateTime == null && this.selectedEndDateTime == null) {
            return null;
        }
        if (this._selectedRangeDatesObject != null) {
            return this._selectedRangeDatesObject;
        }
        const format = this.getDateTimeFormat();
        let startDatee: IMdsAngularDateTimePickerDate;
        let endDatee: IMdsAngularDateTimePickerDate;
        if (this.isPersian) {
            startDatee = {
                year: this.selectedStartDateTime == null ? 0 : this.selectedPersianStartDateTime.year,
                month: this.selectedStartDateTime == null ? 0 : this.selectedPersianStartDateTime.month,
                day: this.selectedStartDateTime == null ? 0 : this.selectedPersianStartDateTime.day,
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
                formatString: this.selectedStartDateTime == null ? '' : this.selectedPersianStartDateTime.toString(format),
                utcDateTime: this.selectedStartDateTime
            };
            endDatee = {
                year: this.selectedPersianEndDateTime == null ? 0 : this.selectedPersianEndDateTime.year,
                month: this.selectedPersianEndDateTime == null ? 0 : this.selectedPersianEndDateTime.month,
                day: this.selectedPersianEndDateTime == null ? 0 : this.selectedPersianEndDateTime.day,
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
                formatString: this.selectedPersianEndDateTime == null ? '' : this.selectedPersianEndDateTime.toString(format),
                utcDateTime: this.selectedEndDateTime
            };
        } else {
            startDatee = {
                year: this.selectedStartDateTime == null ? 0 : this.selectedStartDateTime.getFullYear(),
                month: this.selectedStartDateTime == null ? 0 : this.selectedStartDateTime.getMonth(),
                day: this.selectedStartDateTime == null ? 0 : this.selectedStartDateTime.getDate(),
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
                formatString: this.selectedStartDateTime == null ? '' :
                    MdsDatetimePickerUtility.dateTimeToString(this.selectedStartDateTime, format),
                utcDateTime: this.selectedStartDateTime == null ? null : this.selectedStartDateTime
            };
            endDatee = {
                year: this.selectedEndDateTime == null ? 0 : this.selectedEndDateTime.getFullYear(),
                month: this.selectedEndDateTime == null ? 0 : this.selectedEndDateTime.getMonth(),
                day: this.selectedEndDateTime == null ? 0 : this.selectedEndDateTime.getDate(),
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
                formatString: this.selectedEndDateTime == null ? '' :
                    MdsDatetimePickerUtility.dateTimeToString(this.selectedEndDateTime, format),
                utcDateTime: this.selectedEndDateTime == null ? null : this.selectedEndDateTime
            };
        }
        this._selectedRangeDatesObject = {
            startDate: startDatee,
            endDate: endDatee
        };
        return this._selectedRangeDatesObject;
    }

    get isRejectButtonDisable(): boolean {
        return this.selectedStartDateTime == null && this.selectedEndDateTime == null;
    }

    get isConfirmButtonDisable(): boolean {
        return this.selectedStartDateTime == null || this.selectedEndDateTime == null;
    }

    private get isRangeSelectorReady(): boolean {
        if (!this.rangeSelector) {
            return false;
        }
        if (this.selectedStartDateTime == null) {
            return false;
        } // هنوز روز شروع انتخاب نشده است
        if (this.selectedStartDateTime != null && this.selectedEndDateTime != null) {
            return false;
        } // رنج تاریخ انتخاب شده بود
        return true;
    }

    daysAnimationStateName = 'visible';
    monthOrYearSelectorVisibilityStateName = 'hidden';
    monthSelectorVisibilityStateName = 'hidden';
    yearSelectorVisibilityStateName = 'hidden';

    showMonthSelectorBlock: boolean;
    showYearsSelectorBlock: boolean;

    // تاریخی که برای نمایش تقویم استفاده می شود
    private _dateTime: Date = null;

    private _persianDateTime: PersianDateTime = null;

    // روز انتخاب شده
    private _selectedDateTime: Date = null;

    private _selectedPersianDateTime: PersianDateTime = null;

    // روز شروع انتخاب شده در رنج سلکتور
    private _selectedStartDateTime: Date = null;

    private _selectedPersianStartDateTime: PersianDateTime = null;

    // روز پایانی انتخاب شده در رنج سلکتور
    private _selectedEndDateTime: Date = null;

    private _selectedPersianEndDateTime: PersianDateTime = null;

    yearsToSelect: string[];
    daysInMonth: IMdsAngularDateTimePickerDay[];

    private _resources: any = null;
    private _year = 0;
    private _yearString = '';
    private _month = 0;
    private _monthName = '';
    private _monthNames: string[] = [];
    private _hour = 0;
    private _hourString = '';
    private _minute = 0;
    private _minuteString = '';
    private _second = 0;
    private _secondString = '';
    private _weekdayNames: string[] = [];
    private _IMdsAngularDateTimePickerDate: IMdsAngularDateTimePickerDate = null;

    private _selectedRangeDatesObject: IMdsAngularDateTimePickerRangeDate = null;

    ngOnInit() {
        if (this.rangeSelector) {
            this.timePicker = false;
        }
        if (!this.isPersian) {
            this.persianChar = false;
        }
        // if (this.initialValue != '') {
        //   if (this.rangeSelector) {
        //     try {
        //       if (this.isPersian) {
        //         const ranges = MdsDatetimePickerUtility.getPersianDateRanges(this.initialValue);
        //         this.setSelectedRangePersianDateTimes(ranges);
        //       } else {
        //         const ranges = MdsDatetimePickerUtility.getDateRanges(this.initialValue);
        //         this.setSelectedRangeDateTimes(ranges);
        //       }
        //       this.dateTime = this.selectedStartDateTime;
        //     } catch (e) {
        //       console.error('value is in wrong format, when rangeSelector
        //       is true you should write value like "1396/03/01 - 1396/03/15" or "2017/3/9 - 2017/3/10"', e);
        //       this.setSelectedRangeDateTimes(null);
        //       this.dateTime = null;
        //     }
        //   } else {
        //     try {
        //       if (this.isPersian) {
        //         this.dateTime = PersianDateTime.parse(this.initialValue).toDate();
        //       } else {
        //         this.dateTime = new Date(Date.parse(this.initialValue));
        //       }
        //     } catch (e) {
        //       console.error('value is in wrong format, you should write value like
        //       "1396/03/01  11:30:27" or "2017/09/03  11:30:00", you can remove time', e);
        //       this.dateTime = null;
        //     }
        //   }
        // } else {
        //   this.dateTime = null;
        // }
        // this.updateYearsList();
        // this.updateMonthDays();

        // if (this.initialValue != '') {
        //   if (this.rangeSelector) {
        //     this.fireRangeChangeEvent();
        //   } else {
        //     this.fireChangeEvent();
        //   }
        // }
        this.dateTime = null;
        this.updateYearsList();
        this.updateMonthDays();
        this.initialized = true;
    }

    private splitStartEndDateString(dateString: string): string[] {
        return dateString.split(' - ');
    }

    private setSelectedRangeDateTimes(dateTimes: Date[]): void {
        dateTimes = dateTimes == null || dateTimes.length < 2 ? [null, null] : dateTimes;
        this.selectedStartDateTime = dateTimes[0];
        this.selectedEndDateTime = dateTimes[1];
    }

    private setSelectedRangePersianDateTimes(persianDateTimes: PersianDateTime[]): void {
        const ranges = [
            persianDateTimes[0] == null ? null : persianDateTimes[0].toDate(),
            persianDateTimes[1] == null ? null : persianDateTimes[1].toDate()
        ];
        this.setSelectedRangeDateTimes(ranges);
    }

    private clearTime(dateTime: Date): void {
        if (dateTime == null) {
            return;
        }
        dateTime.setHours(0, 0, 0, 0);
    }

    private getDateTimeFormat(): string {
        let format = this.format;
        if (format.trim() === '') {
            format = 'yyyy/MM/dd';
            if (this.timePicker && !this.rangeSelector) {
                format += '   hh:mm:ss';
            }
        } else if (this.rangeSelector || !this.timePicker) {
            format = format.replace(/t*|f*|s*|m*|h*|H*/, '');
        }
        return format;
    }

    setDateTimeByDate(dateTime: Date): void {
        this.dateTime = this.selectedDateTime = dateTime;
        this.selectedStartDateTime = !dateTime ? null : new Date(dateTime);
    }

    setDateTimeRangesByDate(startDateTime: Date, endDateTime: Date): void {
        this.dateTime = this.selectedDateTime = startDateTime;
        this.selectedStartDateTime = startDateTime == null ? null : new Date(startDateTime);
        this.selectedEndDateTime = endDateTime == null ? null : new Date(endDateTime);
    }

    setDateTimeByString(dateTimeString: string) {
        try {
            if (dateTimeString === '') {
                this.clearDateTimePicker();
                return;
            }
            if (this.isPersian) {
                if (this.rangeSelector) {
                    const startAndEndDateArray = this.splitStartEndDateString(dateTimeString);
                    this.dateTime = this.selectedStartDateTime = PersianDateTime.parse(startAndEndDateArray[0]).toDate();
                    this.selectedEndDateTime = PersianDateTime.parse(startAndEndDateArray[1]).toDate();
                    if (this.selectedStartDateTime > this.selectedEndDateTime) {
                        throw new Error('Start date must be less than end date');
                    }
                } else {
                    this.dateTime = this.selectedDateTime = PersianDateTime.parse(dateTimeString).toDate();
                }
            } else {
                if (this.rangeSelector) {
                    const startAndEndDateArray = this.splitStartEndDateString(dateTimeString);
                    this.dateTime = this.selectedStartDateTime = new Date(Date.parse(startAndEndDateArray[0]));
                    this.selectedEndDateTime = new Date(Date.parse(startAndEndDateArray[1]));
                    if (this.selectedStartDateTime > this.selectedEndDateTime) {
                        throw new Error('Start date must be less than end date');
                    }
                } else {
                    this.dateTime = this.selectedDateTime = new Date(Date.parse(dateTimeString));
                }
            }
            if (this.rangeSelector) {
                this.fireRangeChangeEvent();
            } else {
                this.fireChangeEvent();
            }
            this.updateMonthDays();
        } catch (e) {
            this.clearDateTimePicker();
            throw new Error(e);
        }
    }

    clearDateTimePicker() {
        this.dateTime = null;
        this.selectedDateTime = this.selectedStartDateTime = this.selectedEndDateTime = null;
        this.resetToFalseRangeParametersInMonthDays();
        if (this.rangeSelector) {
            this.fireRangeChangeEvent();
        } else {
            this.fireChangeEvent();
        }
        this.updateMonthDays();
    }

    private updateYearsList(): void {
        this.yearsToSelect = [];
        const selectedYear = this.year;
        for (let i = selectedYear - 37; i <= selectedYear + 37; i++) {
            if (this.persianChar) {
                this.yearsToSelect.push(MdsDatetimePickerUtility.toPersianNumber(i.toString()));
            } else {
                this.yearsToSelect.push(i.toString());
            }
        }
    }

    private getDayObject(yearr: number, monthh: number, dayy: number, disabled: boolean,
                         holiDayy: boolean, isToday: boolean): IMdsAngularDateTimePickerDay {
        let isWithinDateRangee = false;
        let isStartOrEndOfRangee = false;
        if (this.rangeSelector && this.selectedStartDateTime != null) {
            const dateTime = this.isPersian
                ? PersianDateTime.fromPersianDate(yearr, monthh, dayy).toDate()
                : new Date(yearr, monthh, dayy);
            isWithinDateRangee = dateTime >= this.selectedStartDateTime;
            if (this.selectedEndDateTime != null) {
                isWithinDateRangee = isWithinDateRangee && dateTime <= this.selectedEndDateTime;
            }
            isStartOrEndOfRangee =
                (this.selectedStartDateTime != null && dateTime.getTime() === this.selectedStartDateTime.getTime()) ||
                (this.selectedEndDateTime != null && dateTime.getTime() === this.selectedEndDateTime.getTime());
        }
        return {
            year: yearr,
            month: monthh,
            day: dayy,
            dayString: this.persianChar ? MdsDatetimePickerUtility.toPersianNumber(dayy.toString()) : dayy.toString(),
            disable: disabled,
            holiDay: holiDayy,
            today: isToday,
            isWithinRange: isWithinDateRangee,
            isStartOrEndOfRange: isStartOrEndOfRangee
        };
    }

    private updateMonthDays(): void {
        const days: IMdsAngularDateTimePickerDay[] = [];
        let counter = 0,
            year = 0,
            month = 0;
        if (this.isPersian) {
            const persianDateTimeNow = PersianDateTime.now;
            const today = persianDateTimeNow.day;
            const isYearAndMonthInCurrentMonth = persianDateTimeNow.year ===
                this.persianDateTime.year && persianDateTimeNow.month === this.persianDateTime.month;
            // روزهای ماه قبل
            if (this.persianStartDayOfMonth !== PersianDayOfWeek.Saturday) {
                const previousPersianMonth = this.persianDateTime.addMonths(-1);
                year = previousPersianMonth.year;
                month = previousPersianMonth.month;
                for (let i = previousPersianMonth.getMonthDays - this.persianStartDayOfMonth + 1;
                     i <= previousPersianMonth.getMonthDays; i++) {
                    counter++;
                    days.push(this.getDayObject(year, month, i, true, false, false));
                }
            }
            // روزهای ماه جاری
            year = this.persianDateTime.year;
            month = this.persianDateTime.month;
            for (let i = 1; i <= this.persianDateTime.getMonthDays; i++) {
                counter++;
                days.push(this.getDayObject(year, month, i, false, false, isYearAndMonthInCurrentMonth && i === today));
            }
            // روزهای ماه بعد
            const nextMonthPersianDateTime = this.persianDateTime.addMonths(1);
            year = nextMonthPersianDateTime.year;
            month = nextMonthPersianDateTime.month;
            for (let i = 1; counter <= (6 * 7) - 1; i++) {
                counter++;
                days.push(this.getDayObject(year, month, i, true, false, false));
            }
            // درست کردن راست به چپ بودن تقویم
            const temp = days.slice(0);
            for (let row = 0; row < 6; row++) {
                for (let column = 0; column < 7; column++) {
                    const index1 = row * 7 + column;
                    const index2 = Math.abs((row + 1) * 7 - (column + 1));
                    days[index1] = temp[index2];
                    if (column === 0) {
                        days[index1].holiDay = true;
                    }
                }
            }
        } else {
            const dateTimeNow = new Date();
            const today = dateTimeNow.getDate();
            const isYearAndMonthInCurrentMonth = dateTimeNow.getMonth() ===
                this.dateTime.getMonth() && dateTimeNow.getFullYear() === this.dateTime.getFullYear();
            // روزهای ماه قبل
            if (this.gregorianStartDayOfMonth !== GregorianDayOfWeek.Saturday) {
                const dateTimeClone = new Date(this.dateTime);
                dateTimeClone.setMonth(this.dateTime.getMonth());
                year = dateTimeClone.getFullYear();
                month = dateTimeClone.getMonth();
                const previousMonthDays = new Date(dateTimeClone.getFullYear(), dateTimeClone.getMonth(), 0).getDate();
                for (let i = previousMonthDays - this.gregorianStartDayOfMonth + 1; i <= previousMonthDays; i++) {
                    counter++;
                    days.push(this.getDayObject(year, month - 1, i, true, false, false));
                }
            }
            // روزهای ماه جاری
            year = this.dateTime.getFullYear();
            month = this.dateTime.getMonth();
            const currentMonthDays = new Date(year, month, 0).getDate();
            for (let i = 1; i <= currentMonthDays; i++) {
                counter++;
                days.push(this.getDayObject(year, month, i, false, false, isYearAndMonthInCurrentMonth && i === today));
            }
            // روزهای ماه بعد
            const nextMonthDateTime = new Date(year, month + 1, 1);
            year = nextMonthDateTime.getFullYear();
            month = nextMonthDateTime.getMonth();
            for (let i = 1; counter <= (6 * 7) - 1; i++) {
                counter++;
                days.push(this.getDayObject(year, month, i, true, false, false));
            }
            // تعطیل کردن روزهای جمعه
            for (let row = 0; row < 6; row++) {
                for (let column = 0; column < 7; column++) {
                    const index1 = row * 7 + column;
                    if (column === 0) {
                        days[index1].holiDay = true;
                    }
                }
            }
        }
        this.daysInMonth = days;
    }

    private fireChangeEvent(): void {
        this.dateChanged.emit(this.getSelectedDateObject);
    }

    private fireRangeChangeEvent(): void {
        this.rangeDateChanged.emit(this.getSelectedRangeDatesObject);
    }

    private resetToFalseRangeParametersInMonthDays() {
        for (const day of this.daysInMonth) {
            day.isWithinRange = false;
            day.isStartOrEndOfRange = false;
        }
    }

    /**
     * ریست کردن تمامی اطلاعات روزهای ماه
     */
    private resetMonthDaysWithContent() {
        if (this.daysInMonth === undefined) {
            return;
        }
        for (const day of this.daysInMonth) {
            day.isWithinRange = false;
            day.isStartOrEndOfRange = false;
            day.dayString = this.persianChar
                ? MdsDatetimePickerUtility.toPersianNumber(day.day.toString())
                : day.day.toString();
        }
    }

    /**
     * مخفی کردن بلاک های انتخاب ماه و سال
     */
    hideSelecMonthAndYearBlock(): void {
        this.monthOrYearSelectorVisibilityStateName = 'hidden';
        this.monthSelectorVisibilityStateName = 'hidden';
        this.yearSelectorVisibilityStateName = 'hidden';
    }

    resetIncompleteRanges(): void {
        if (this.selectedStartDateTime == null || this.selectedEndDateTime == null) {
            this.selectedStartDateTime = this.selectedEndDateTime = null;
            this._selectedPersianStartDateTime = this._selectedPersianEndDateTime = null;
            this.resetToFalseRangeParametersInMonthDays();
        }
    }

    /**
     * کلیک روی دکمه نام ماه در بالای پیکر برای انتخاب ماه
     */
    monthButtonOnClick(): void {
        this.monthOrYearSelectorVisibilityStateName = 'visible';
        this.monthSelectorVisibilityStateName = 'visible';
    }

    /**
     * کلیک روی دکمه سال در بالای پیکر برای انتخاب سال
     */
    selectYearButtonOnClick(): void {
        this.monthOrYearSelectorVisibilityStateName = 'visible';
        this.yearSelectorVisibilityStateName = 'visible';
    }

    monthsBlockVisibilityAnimationDone(): void {
        this.updateMonthDays();
    }

    yearsBlockVisibilityAnimationDone(): void {
        this.updateYearsList();
        this.updateMonthDays();
    }

    nextYearButtonOnClick(): void {
        if (this.isPersian) {
            this.dateTime = this.persianDateTime.addYears(1).toDate();
        } else {
            this.dateTime = new Date(this.dateTime.setFullYear(this.dateTime.getFullYear() + 1));
        }
        this.updateMonthDays();
    }

    nextMonthButtonOnClick(): void {
        if (this.isPersian) {
            this.dateTime = this.persianDateTime.addMonths(1).toDate();
        } else {
            this.dateTime = new Date(this.dateTime.setMonth(this.dateTime.getMonth() + 1));
        }
        this.updateMonthDays();
    }

    previousMonthButtonOnClick(): void {
        if (this.isPersian) {
            this.dateTime = this.persianDateTime.addMonths(-1).toDate();
        } else {
            this.dateTime = new Date(this.dateTime.setMonth(this.dateTime.getMonth() - 1));
        }
        this.updateMonthDays();
    }

    previousYearButtonOnClick(): void {
        if (this.isPersian) {
            this.dateTime = this.persianDateTime.addYears(-1).toDate();
        } else {
            this.dateTime = new Date(this.dateTime.setFullYear(this.dateTime.getFullYear() - 1));
        }
        this.updateMonthDays();
    }

    hourUpButtonOnClick(): void {
        this.dateTime = this.selectedDateTime = new Date(this.dateTime.setHours(this.dateTime.getHours() + 1));
        this.fireChangeEvent();
    }

    hourDownButtonOnClick(): void {
        this.dateTime = this.selectedDateTime = new Date(this.dateTime.setHours(this.dateTime.getHours() - 1));
        this.fireChangeEvent();
    }

    minuteUpButtonOnClick(): void {
        this.dateTime = this.selectedDateTime = new Date(this.dateTime.setMinutes(this.dateTime.getMinutes() + 1));
        this.fireChangeEvent();
    }

    minuteDownButtonOnClick(): void {
        this.dateTime = this.selectedDateTime = new Date(this.dateTime.setMinutes(this.dateTime.getMinutes() - 1));
        this.fireChangeEvent();
    }

    secondUpButtonOnClick(): void {
        this.dateTime = this.selectedDateTime = new Date(this.dateTime.setSeconds(this.dateTime.getSeconds() + 1));
        this.fireChangeEvent();
    }

    secondDownButtonOnClick(): void {
        this.dateTime = this.selectedDateTime = new Date(this.dateTime.setSeconds(this.dateTime.getSeconds() - 1));
        this.fireChangeEvent();
    }

    /**
     * انتخاب ماه از روی لیست ماه ها
     */
    monthOnClick(selectedMonthName): void {
        const monthIndex = this.isPersian
            ? PersianDateTime.getPersianMonthIndex(selectedMonthName)
            : PersianDateTime.getGregorianMonthNameIndex(selectedMonthName);
        if (this.isPersian) {
            this.dateTime = this.selectedDateTime = this.persianDateTime.setPersianMonth(monthIndex + 1).toDate();
        } else {
            const dateTimeClone = new Date(this.dateTime);
            dateTimeClone.setMonth(monthIndex);
            this.dateTime = this.selectedDateTime = new Date(dateTimeClone);
        }
        this.fireChangeEvent();
        this.hideSelecMonthAndYearBlock();
    }

    /**
     * انتخاب سال از روی لیست سال ها
     */
    yearOnClick(selectedYear): void {
        const year = this.isPersian ? Number(MdsDatetimePickerUtility.toEnglishNumber(selectedYear)) : Number(selectedYear);
        if (this.isPersian) {
            this.dateTime = this.selectedDateTime = this.persianDateTime.setPersianYear(year).toDate();
        } else {
            const dateTimeClone = new Date(this.dateTime);
            dateTimeClone.setFullYear(year);
            this.dateTime = this.selectedDateTime = new Date(dateTimeClone);
        }
        this.fireChangeEvent();
        this.hideSelecMonthAndYearBlock();
    }

    todayButtonOnClick(): void {
        const dateTimeNow = new Date();
        if (this.dateTime.getFullYear() !== dateTimeNow.getFullYear() || this.dateTime.getMonth() !== dateTimeNow.getMonth()) {
            this.dateTime = dateTimeNow;
            this.updateMonthDays();
        } else {
            this.dateTime = dateTimeNow;
        }
        this.selectedDateTime = dateTimeNow;
        if (!this.rangeSelector) {
            this.fireChangeEvent();
        }
    }

    dayButtonOnClick(dayObject: IMdsAngularDateTimePickerDay): void {
        // روی روزهای ماه های قبل یا بعد کلیک شده است
        if (dayObject.disable) {
            if (this.isPersian) {
                this.dateTime = PersianDateTime.fromPersianDate(dayObject.year, dayObject.month, dayObject.day).toDate();
            } else {
                const dateTimeClone = new Date(this.dateTime);
                dateTimeClone.setDate(dayObject.day);
                dateTimeClone.setMonth(dayObject.month);
                dateTimeClone.setFullYear(dayObject.year);
                this.dateTime = dateTimeClone;
            }
            this.updateMonthDays();
            return;
        }

        // نال کردن تاریخ های شروع و پایان برای انتخاب مجدد رنج تاریخ
        // در صورتی که رنج گرفته شده بود
        if (this.rangeSelector && this.selectedStartDateTime != null && this.selectedEndDateTime != null) {
            this.selectedStartDateTime = null;
            this.selectedEndDateTime = null;
            this.resetToFalseRangeParametersInMonthDays();
        }
        // \\

        // روز انتخاب شده
        this.selectedDateTime = this.isPersian
            ? PersianDateTime.fromPersianDateTime(dayObject.year, dayObject.month, dayObject.day, this.hour, this.minute, this.second, 0)
                .toDate()
            : new Date(dayObject.year, dayObject.month, dayObject.day, this.hour, this.minute, this.second);

        if (this.rangeSelector) {
            if (this.selectedStartDateTime == null || this.selectedStartDateTime >= this.selectedDateTime) {
                this.resetToFalseRangeParametersInMonthDays();
                this.selectedStartDateTime = this.selectedDateTime;
                dayObject.isStartOrEndOfRange = true;
            } else {
                this.selectedEndDateTime = this.selectedDateTime;
                dayObject.isStartOrEndOfRange = true;
            }
        }
        if (this.rangeSelector && this.selectedStartDateTime != null && this.selectedEndDateTime != null) {
            this.fireRangeChangeEvent();
        } else if (!this.rangeSelector) {
            this.fireChangeEvent();
        }
    }

    dayButtonOnHover(dayObject: IMdsAngularDateTimePickerDay): void {
        if (!this.isRangeSelectorReady) {
            return;
        }
        // تاریخ روزی که موس روی آن است
        const hoverCellDate: Date = this.isPersian
            ? PersianDateTime.fromPersianDate(dayObject.year, dayObject.month, dayObject.day).toDate()
            : new Date(dayObject.year, dayObject.month, dayObject.day);
        for (const day of this.daysInMonth) {
            const currentDate: Date = this.isPersian
                ? PersianDateTime.fromPersianDate(day.year, day.month, day.day).toDate()
                : new Date(day.year, day.month, day.day);
            day.isWithinRange = currentDate >= this.selectedStartDateTime && currentDate <= hoverCellDate;
        }
    }

    rejectButtonOnClick(): void {
        this.selectedDateTime = null;
        this.selectedStartDateTime = this.selectedEndDateTime = null;
        this.resetToFalseRangeParametersInMonthDays();
        this.fireRangeChangeEvent();
    }

    confirmButtonOnClick(): void {
        if (this.selectedStartDateTime != null && this.selectedEndDateTime != null) {
            this.fireRangeChangeEvent();
        }
    }
}

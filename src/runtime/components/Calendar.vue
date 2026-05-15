<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { AppConfig } from '@nuxt/schema';
import type { CalendarCellTriggerProps, CalendarRootEmits, CalendarRootProps, DateRange, RangeCalendarRootEmits, RangeCalendarRootProps } from 'akar';
import type { VNode } from 'vue';
import type { ButtonProps, IconProps, LinkPropsKeys } from '../types';
import type { ComponentConfig } from '../types/uv';
import { getWeekNumber } from 'akar/date';
import theme from '#build/ui/calendar';

type Calendar = ComponentConfig<typeof theme, AppConfig, 'calendar'>;

type CalendarDefaultValue<R extends boolean = false, M extends boolean = false> = R extends true
  ? DateRange
  : M extends true
    ? Array<DateValue>
    : DateValue;
type CalendarModelValue<R extends boolean = false, M extends boolean = false> = R extends true
  ? (DateRange | null)
  : M extends true
    ? (Array<DateValue> | undefined)
    : (DateValue | undefined);

type _CalendarRootProps = Omit<CalendarRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale' | 'calendarLabel' | 'multiple'>;
type _RangeCalendarRootProps = Omit<RangeCalendarRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale' | 'calendarLabel' | 'multiple'>;

export interface CalendarProps<R extends boolean = false, M extends boolean = false> extends _RangeCalendarRootProps, _CalendarRootProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The icon to use for the next year control.
   * @defaultValue appConfig.ui.icons.chevronDoubleRight
   * @IconifyIcon
   */
  nextYearIcon?: IconProps['name'];
  /**
   * Configure the next year button.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   */
  nextYear?: Omit<ButtonProps, LinkPropsKeys>;
  /**
   * The icon to use for the next month control.
   * @defaultValue appConfig.ui.icons.chevronRight
   * @IconifyIcon
   */
  nextMonthIcon?: IconProps['name'];
  /**
   * Configure the next month button.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   */
  nextMonth?: Omit<ButtonProps, LinkPropsKeys>;
  /**
   * The icon to use for the previous year control.
   * @defaultValue appConfig.ui.icons.chevronDoubleLeft
   * @IconifyIcon
   */
  prevYearIcon?: IconProps['name'];
  /**
   * Configure the prev year button.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   */
  prevYear?: Omit<ButtonProps, LinkPropsKeys>;
  /**
   * The icon to use for the previous month control.
   * @defaultValue appConfig.ui.icons.chevronLeft
   * @IconifyIcon
   */
  prevMonthIcon?: IconProps['name'];
  /**
   * Configure the prev month button.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   */
  prevMonth?: Omit<ButtonProps, LinkPropsKeys>;
  /**
   * @defaultValue 'primary'
   */
  color?: Calendar['variants']['color'];
  /**
   * @defaultValue 'solid'
   */
  variant?: Calendar['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: Calendar['variants']['size'];
  /** Whether or not a range of dates can be selected */
  range?: R & boolean;
  /** Whether or not multiple dates can be selected */
  multiple?: M & boolean;
  /** Show month controls */
  monthControls?: boolean;
  /** Show year controls */
  yearControls?: boolean;
  defaultValue?: CalendarDefaultValue<R, M>;
  modelValue?: CalendarModelValue<R, M>;
  weekNumbers?: boolean;
  class?: any;
  ui?: Calendar['slots'];
}

export interface CalendarEmits<R extends boolean = false, M extends boolean = false> extends Omit<CalendarRootEmits & RangeCalendarRootEmits, 'update:modelValue'> {
  'update:modelValue': [value: CalendarModelValue<R, M>];
}

export interface CalendarSlots {
  'heading'?: (props: { value: string }) => Array<VNode>;
  'day'?: (props: Pick<CalendarCellTriggerProps, 'day'>) => Array<VNode>;
  'week-day'?: (props: { day: string }) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="R extends boolean, M extends boolean">
import { reactiveOmit } from '@vueuse/core';
import { } from 'akar';
import { RangeCalendar, Calendar as SingleCalendar } from 'akar/namespaced';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { useForwardProps } from '../composables/useForwardProps';
import { useLocale } from '../composables/useLocale';
import { uv } from '../utils/uv';
import PButton from './Button.vue';

const _props = withDefaults(
  defineProps<CalendarProps<R, M>>(),
  {
    fixedWeeks: true,
    monthControls: true,
    yearControls: true,
  },
);
const emits = defineEmits<CalendarEmits<R, M>>();

defineSlots<CalendarSlots>();

const props = useComponentProps<CalendarProps<R, M>>('calendar', _props);

const { dir, t, locale } = useLocale();
const appConfig = useAppConfig() as Calendar['AppConfig'];

const rootProps = useForwardProps(reactiveOmit(props, 'range', 'modelValue', 'defaultValue', 'color', 'variant', 'size', 'monthControls', 'yearControls', 'class', 'ui'), emits);

const nextYearIcon = computed(() => props.nextYearIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronDoubleLeft : appConfig.ui.icons.chevronDoubleRight));

const nextMonthIcon = computed(() => props.nextMonthIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight));

const prevYearIcon = computed(() => props.prevYearIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronDoubleRight : appConfig.ui.icons.chevronDoubleLeft));

const prevMonthIcon = computed(() => props.prevMonthIcon || (dir.value === 'rtl' ? appConfig.ui.icons.chevronRight : appConfig.ui.icons.chevronLeft));

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.calendar || {}) })({
  color: props.color,
  size: props.size,
  variant: props.variant,
  weekNumbers: props.weekNumbers,
}));

function paginateYear(date: DateValue, sign: -1 | 1) {
  if (sign === -1) {
    return date.subtract({ years: 1 });
  }

  return date.add({ years: 1 });
}

const CalendarComp = computed(() => props.range ? RangeCalendar : SingleCalendar);
</script>

<template>
  <CalendarComp.Root
    v-slot="{ weekDays, grid }"
    v-bind="rootProps"
    :model-value="(props.modelValue as DateValue | DateValue[])"
    :default-value="(props.defaultValue as DateValue)"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
  >
    <CalendarComp.Header data-slot="header" :class="ui.header({ class: props.ui?.header })">
      <CalendarComp.Prev v-if="props.yearControls" :prev-page="(date: DateValue) => paginateYear(date, -1)" :aria-label="t('calendar.prevYear')" as-child>
        <PButton :icon="prevYearIcon" :size="props.size" color="neutral" variant="ghost" v-bind="props.prevYear" />
      </CalendarComp.Prev>
      <CalendarComp.Prev v-if="props.monthControls" :aria-label="t('calendar.prevMonth')" as-child>
        <PButton :icon="prevMonthIcon" :size="props.size" color="neutral" variant="ghost" v-bind="props.prevMonth" />
      </CalendarComp.Prev>
      <CalendarComp.Heading v-slot="{ headingValue }" data-slot="heading" :class="ui.heading({ class: props.ui?.heading })">
        <slot name="heading" :value="headingValue">
          {{ headingValue }}
        </slot>
      </CalendarComp.Heading>
      <CalendarComp.Next v-if="props.monthControls" :aria-label="t('calendar.nextMonth')" as-child>
        <PButton :icon="nextMonthIcon" :size="props.size" color="neutral" variant="ghost" v-bind="props.nextMonth" />
      </CalendarComp.Next>
      <CalendarComp.Next v-if="props.yearControls" :next-page="(date: DateValue) => paginateYear(date, 1)" :aria-label="t('calendar.nextYear')" as-child>
        <PButton :icon="nextYearIcon" :size="props.size" color="neutral" variant="ghost" v-bind="props.nextYear" />
      </CalendarComp.Next>
    </CalendarComp.Header>
    <div data-slot="body" :class="ui.body({ class: props.ui?.body })">
      <CalendarComp.Grid
        v-for="month in grid"
        :key="month.value.toString()"
        data-slot="grid"
        :class="ui.grid({ class: props.ui?.grid })"
      >
        <CalendarComp.GridHead>
          <CalendarComp.GridRow data-slot="gridWeekDaysRow" :class="ui.gridWeekDaysRow({ class: props.ui?.gridWeekDaysRow })">
            <CalendarComp.HeadCell
              v-for="day in weekDays"
              :key="day"
              data-slot="headCell"
              :class="ui.headCell({ class: props.ui?.headCell })"
            >
              <slot name="week-day" :day="day">
                {{ day }}
              </slot>
            </CalendarComp.HeadCell>
          </CalendarComp.GridRow>
        </CalendarComp.GridHead>
        <CalendarComp.GridBody data-slot="gridBody" :class="ui.gridBody({ class: props.ui?.gridBody })">
          <CalendarComp.GridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            data-slot="gridRow"
            :class="ui.gridRow({ class: props.ui?.gridRow })"
          >
            <td
              v-if="props.weekNumbers && weekDates[0]"
              role="gridcell"
              data-slot="cellWeek"
              :class="ui.cellWeek({ class: props.ui?.cellWeek })"
            >
              {{ getWeekNumber(weekDates[0], locale.code) }}
            </td>
            <CalendarComp.Cell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              data-slot="cell"
              :class="ui.cell({ class: props.ui?.cell })"
            >
              <CalendarComp.CellTrigger
                :day="weekDate"
                :month="month.value"
                data-slot="cellTrigger"
                :class="ui.cellTrigger({ class: props.ui?.cellTrigger })"
              >
                <slot name="day" :day="weekDate">
                  {{ weekDate.day }}
                </slot>
              </CalendarComp.CellTrigger>
            </CalendarComp.Cell>
          </CalendarComp.GridRow>
        </CalendarComp.GridBody>
      </CalendarComp.Grid>
    </div>
  </CalendarComp.Root>
</template>

import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    header: '',
    body: '',
    heading: '',
    grid: '',
    gridRow: '',
    gridWeekDaysRow: '',
    gridBody: '',
    headCell: '',
    headCellWeek: '',
    cell: '',
    cellTrigger: '',
    cellWeek: '',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        headCell: '',
        cellTrigger: '',
      }])),
      neutral: {
        headCell: '',
        cellTrigger: '',
      },
    },
    variant: {
      solid: '',
      outline: '',
      soft: '',
      subtle: '',
    },
    size: {
      xs: {
        heading: '',
        cell: '',
        cellWeek: '',
        headCell: '',
        headCellWeek: '',
        cellTrigger: '',
        body: '',
      },
      sm: {
        heading: '',
        headCell: '',
        headCellWeek: '',
        cellWeek: '',
        cell: '',
        cellTrigger: '',
      },
      md: {
        heading: '',
        headCell: '',
        headCellWeek: '',
        cellWeek: '',
        cell: '',
        cellTrigger: '',
      },
      lg: {
        heading: '',
        headCell: '',
        headCellWeek: '',
        cellTrigger: '',
      },
      xl: {
        heading: '',
        headCell: '',
        headCellWeek: '',
        cellTrigger: '',
      },
    },
    weekNumbers: {
      true: {
        gridRow: '',
        gridWeekDaysRow: '',
      },
    },
  },
  compoundVariants: [],

  defaultVariants: {
    size: 'md',
    color: 'primary',
    variant: 'solid',
  },
});

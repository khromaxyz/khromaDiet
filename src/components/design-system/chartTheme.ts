import type { PartialTheme } from '@nivo/theming';

const baseTextStyle = {
  fontFamily: 'var(--font-body)',
  outlineWidth: 0,
  outlineColor: 'transparent',
  outlineOpacity: 1,
};

export const NIVO_THEME: PartialTheme = {
  background: 'transparent',
  text: {
    ...baseTextStyle,
    fontSize: 12,
    fill: 'var(--text-tertiary)',
  },
  axis: {
    domain: {
      line: {
        stroke: 'var(--border-subtle)',
        strokeWidth: 1,
      },
    },
    legend: {
      text: {
        ...baseTextStyle,
        fontSize: 12,
        fill: 'var(--text-tertiary)',
      },
    },
    ticks: {
      line: {
        stroke: 'var(--border-subtle)',
        strokeWidth: 1,
      },
      text: {
        ...baseTextStyle,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        fill: 'var(--text-ghost)',
      },
    },
  },
  grid: {
    line: {
      stroke: 'var(--border-subtle)',
      strokeWidth: 1,
    },
  },
  legends: {
    text: {
      ...baseTextStyle,
      fontSize: 12,
      fill: 'var(--text-tertiary)',
    },
  },
  tooltip: {
    container: {
      background: 'var(--bg-overlay)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      fontSize: '13px',
      padding: '10px 14px',
    },
    basic: {
      whiteSpace: 'nowrap',
    },
    chip: {
      borderRadius: '9999px',
    },
    table: {
      borderCollapse: 'collapse',
    },
    tableCell: {
      padding: '2px 0',
    },
    tableCellValue: {
      fontWeight: 600,
      paddingLeft: '10px',
    },
  },
  crosshair: {
    line: {
      stroke: 'var(--emerald-500)',
      strokeOpacity: 0.4,
      strokeWidth: 1,
    },
  },
};

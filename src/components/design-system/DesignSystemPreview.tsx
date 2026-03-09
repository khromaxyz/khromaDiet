import { ResponsiveLine, type LineSeries } from '@nivo/line';
import { ArrowUpRight, Info, Sparkles } from 'lucide-react';

import {
  ChartContainer,
  DataCard,
  NIVO_THEME,
  SectionHeader,
  SectionShell,
  StatBlock,
} from '@/components/design-system';
import { Badge } from '@/components/ui/primitives/badge';
import { Button } from '@/components/ui/primitives/button';
import { Input } from '@/components/ui/primitives/input';

type PreviewSeries = LineSeries;

const previewSeries: PreviewSeries[] = [
  {
    id: 'Actual intake',
    data: [
      { x: 'Mon', y: 2410 },
      { x: 'Tue', y: 2360 },
      { x: 'Wed', y: 2445 },
      { x: 'Thu', y: 2320 },
      { x: 'Fri', y: 2470 },
      { x: 'Sat', y: 2515 },
      { x: 'Sun', y: 2460 },
    ],
  },
];

const subsectionLabelClassName =
  'border-b border-[var(--border-subtle)] pb-3 font-mono text-[11px] font-medium uppercase tracking-[2.5px] text-[var(--text-muted)]';

const IconChip = ({
  label,
  tone = 'default',
}: {
  label: string;
  tone?: 'default' | 'emerald' | 'gold' | 'blue';
}) => (
  <div
    className={[
      'inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border text-xs font-semibold uppercase tracking-[0.14em] shadow-[var(--shadow-inner-highlight)]',
      tone === 'emerald' &&
        'border-[var(--border-emerald)] bg-[linear-gradient(135deg,rgba(16,185,129,0.12)_0%,rgba(16,185,129,0.04)_100%)] text-[var(--emerald-400)]',
      tone === 'gold' &&
        'border-[var(--border-gold)] bg-[linear-gradient(135deg,rgba(245,158,11,0.12)_0%,rgba(245,158,11,0.04)_100%)] text-[var(--gold-400)]',
      tone === 'blue' &&
        'border-[var(--border-blue)] bg-[linear-gradient(135deg,rgba(59,130,246,0.12)_0%,rgba(59,130,246,0.04)_100%)] text-[var(--blue-400)]',
      tone === 'default' &&
        'border-[var(--border-subtle)] bg-[var(--bg-deep)] text-[var(--text-secondary)]',
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {label}
  </div>
);

const CardSample = ({
  icon,
  tone = 'default',
  badge,
  title,
  description,
  footerLabel,
  footerValue,
  glow = 'none',
  hoverable = false,
}: {
  icon: string;
  tone?: 'default' | 'emerald' | 'gold' | 'blue';
  badge: string;
  title: string;
  description: string;
  footerLabel: string;
  footerValue: string;
  glow?: 'none' | 'emerald' | 'gold' | 'blue';
  hoverable?: boolean;
}) => (
  <DataCard glow={glow} hoverable={hoverable}>
    <div className="flex items-start justify-between gap-4">
      <IconChip label={icon} tone={tone} />
      <span className="rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--bg-deep)] px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[1px] text-[var(--text-muted)]">
        {badge}
      </span>
    </div>

    <div className="mt-5">
      <div className="text-[15px] font-semibold text-[var(--text-primary)]">{title}</div>
      <p className="mt-1 text-[13px] leading-[1.55] text-[var(--text-muted)]">{description}</p>
    </div>

    <div className="my-4 h-px bg-[var(--border-subtle)]" />

    <div className="flex items-center justify-between gap-3 text-xs">
      <span className="text-[var(--text-muted)]">{footerLabel}</span>
      <span className="font-mono text-[13px] font-semibold text-[var(--text-secondary)]">
        {footerValue}
      </span>
    </div>
  </DataCard>
);

export const DesignSystemPreview = () => {
  return (
    <div className="min-h-screen bg-transparent" data-testid="design-system-preview">
      <SectionShell level="abyss">
        <SectionHeader
          eyebrow="00 — React Preview"
          title="KhromaDiet visual foundation"
          subtitle="Canonical React preview of the approved winner: clean neo-brutal shells, editorial hierarchy, sparse layout, and green used only as signal."
          action={
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Official system</Badge>
              <Button variant="outline">
                Inspect foundation
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          }
        />

        <div className="grid gap-4 md:grid-cols-3">
          <DataCard glow="emerald">
            <div className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--text-muted)]">
              Atmosphere
            </div>
            <div className="mt-4 text-[28px] font-semibold leading-[1.1] tracking-[-1px] text-[var(--text-primary)]">
              White, abyss black, and green form the entire visual voltage.
            </div>
          </DataCard>

          <DataCard>
            <div className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--text-muted)]">
              Rhythm
            </div>
            <div className="mt-4 text-[28px] font-semibold leading-[1.1] tracking-[-1px] text-[var(--text-primary)]">
              Density stays controlled. Surfaces feel engineered, not decorative.
            </div>
          </DataCard>

          <DataCard glow="emerald">
            <div className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--text-muted)]">
              Scope
            </div>
            <div className="mt-4 text-[28px] font-semibold leading-[1.1] tracking-[-1px] text-[var(--text-primary)]">
              This preview is the maintenance reference for the implemented winner.
            </div>
          </DataCard>
        </div>
      </SectionShell>

      <SectionShell level="deep" showDivider>
        <SectionHeader
          eyebrow="03 — Section Headers"
          title="Header hierarchy"
          subtitle="Structural, pill, editorial, and numbered compositions now follow the approved winner instead of the previous obsidian-neon language."
        />

        <div className="grid gap-6 xl:grid-cols-2">
          <DataCard>
            <div className="mb-5 flex justify-end">
              <span className="rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1 font-mono text-[9px] uppercase tracking-[2px] text-[var(--text-muted)]">
                Default
              </span>
            </div>
            <SectionHeader
              eyebrow="01 — Dashboard Core"
              title="Operational hierarchy"
              subtitle="The structural header used throughout the app: mono eyebrow, bold title, restrained subtitle."
            />
          </DataCard>

          <DataCard>
            <div className="mb-5 flex justify-end">
              <span className="rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1 font-mono text-[9px] uppercase tracking-[2px] text-[var(--text-muted)]">
                Variant A
              </span>
            </div>
            <SectionHeader
              variant="pill"
              badge="Live Protocol"
              title={
                <>
                  Weekly Performance
                  <br />
                  Overview
                </>
              }
              subtitle="Track nutritional adherence and macro distribution across the current training cycle."
              action={<Button variant="ghost">Export</Button>}
            />
          </DataCard>

          <DataCard>
            <div className="mb-5 flex justify-end">
              <span className="rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1 font-mono text-[9px] uppercase tracking-[2px] text-[var(--text-muted)]">
                Variant B
              </span>
            </div>
            <SectionHeader
              variant="editorial"
              meta="Phase 02 of 04"
              title="Caloric Surplus Phase"
              subtitle="Controlled surplus at +15% maintenance, prioritizing progressive overload and protein sufficiency."
            />
          </DataCard>

          <DataCard>
            <div className="mb-5 flex justify-end">
              <span className="rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1 font-mono text-[9px] uppercase tracking-[2px] text-[var(--text-muted)]">
                Variant C
              </span>
            </div>
            <SectionHeader
              variant="numbered"
              number="03"
              title="Meal Timing Distribution"
              subtitle="Minimal composition for local dashboard sections."
              meta="5 meals · 3h intervals"
              tags={
                <>
                  <Badge variant="outline">Post-workout priority</Badge>
                  <Badge>Stable cadence</Badge>
                </>
              }
            />
          </DataCard>
        </div>
      </SectionShell>

      <SectionShell level="base" showDivider>
        <SectionHeader
          eyebrow="04 — Data Cards"
          title="Material card system"
          subtitle="Cards now use the winner stack directly: clean surfaces, strong borders, measured shadows, and accent only where it changes hierarchy."
        />

        <div className={subsectionLabelClassName}>Standard, hoverable, and glow variants</div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <CardSample
            icon="PL"
            badge="Standard"
            title="Meal Plan A"
            description="High protein protocol optimized for lean mass gain during the current surplus block."
            footerLabel="Adherence"
            footerValue="94%"
            tone="emerald"
          />
          <CardSample
            icon="NW"
            badge="Hoverable"
            title="Next Meal Window"
            description="Post-workout meal targeting 45g protein with fast-digesting carbohydrates."
            footerLabel="Meal #3 of 5"
            footerValue="14:30"
            hoverable
            tone="gold"
          />
          <CardSample
            icon="TR"
            badge="Trend"
            title="Progress Trend"
            description="Body composition analysis showing steady improvement across all key metrics."
            footerLabel="Weekly delta"
            footerValue="+2.3%"
            hoverable
            tone="blue"
          />
          <CardSample
            icon="PR"
            badge="Protein"
            title="Daily Protein"
            description="93% of the 200g target reached with strong adherence to the current protocol."
            footerLabel="Current intake"
            footerValue="187g"
            hoverable
            glow="emerald"
            tone="emerald"
          />
          <CardSample
            icon="CA"
            badge="Carbs"
            title="Daily Carbs"
            description="Controlled carbohydrates aligned to training demand and glycogen restoration."
            footerLabel="Current intake"
            footerValue="284g"
            hoverable
            glow="blue"
            tone="blue"
          />
          <CardSample
            icon="FA"
            badge="Fat"
            title="Daily Fat"
            description="Fat distribution anchored to satiety, hormonal support, and meal timing stability."
            footerLabel="Current intake"
            footerValue="72g"
            hoverable
            glow="gold"
            tone="gold"
          />
        </div>
      </SectionShell>

      <SectionShell level="elevated" showDivider>
        <SectionHeader
          eyebrow="05 — Macro Composition"
          title="A single shell can hold multiple signals"
          subtitle="The macro summary uses one parent card with internal stat blocks, mirroring the assembled product language that now ships in the app."
        />

        <DataCard glow="emerald" hoverable>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--text-muted)]">
                  Daily macro execution
                </div>
                <div className="mt-2 text-[28px] font-semibold tracking-[-1px] text-[var(--text-primary)]">
                  Precision targets with color-coded dominance
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[2px] text-[var(--emerald-400)]">
                <Sparkles className="h-3.5 w-3.5" />
                Live composition
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              <StatBlock
                value="187"
                unit="g"
                label="Protein"
                sublabel="Target: 200g · 748 kcal"
                size="md"
                color="emerald"
                align="center"
              />
              <StatBlock
                value="284"
                unit="g"
                label="Carbohydrates"
                sublabel="Target: 325g · 1,136 kcal"
                size="md"
                color="blue"
                align="center"
              />
              <StatBlock
                value="72"
                unit="g"
                label="Fats"
                sublabel="Target: 90g · 648 kcal"
                size="md"
                color="gold"
                align="center"
              />
            </div>
          </div>
        </DataCard>
      </SectionShell>

      <SectionShell level="deep" showDivider>
        <SectionHeader
          eyebrow="05 — Stat Blocks"
          title="Numerical displays"
          subtitle="Mono digits now sit inside surfaced stat shells with the same card language: gradient depth, top sheen, hover lift, and restrained labels."
        />

        <div className="space-y-12">
          <div>
            <div className={subsectionLabelClassName}>Large stats — 56px mono with glow</div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <StatBlock value="2,847" unit="kcal" label="Total Calories" size="lg" />
              <StatBlock
                value="196"
                unit="g"
                label="Protein Intake"
                size="lg"
                color="emerald"
                trend={{ direction: 'up', label: '12%' }}
              />
              <StatBlock value="84" unit="g" label="Fat Intake" size="lg" color="gold" />
              <StatBlock value="312" unit="g" label="Carb Intake" size="lg" color="blue" />
            </div>
          </div>

          <div>
            <div className={subsectionLabelClassName}>Medium stats — 40px with sublabels</div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <StatBlock
                value="78.4"
                unit="kg"
                label="Body Weight"
                sublabel="-0.3kg this week"
                size="md"
              />
              <StatBlock
                value="94"
                unit="%"
                label="Adherence"
                sublabel="Last 7 days"
                size="md"
                color="emerald"
              />
              <StatBlock
                value="2.2"
                unit="g/kg"
                label="Protein Ratio"
                sublabel="Target: 2.0g/kg"
                size="md"
                color="gold"
              />
              <StatBlock
                value="5"
                unit="meals"
                label="Daily Meals"
                sublabel="3h intervals"
                size="md"
                color="blue"
              />
            </div>
          </div>

          <div>
            <div className={subsectionLabelClassName}>Small stats — compact dashboard use</div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
              <StatBlock value="12.8" unit="%" label="Body Fat" size="sm" />
              <StatBlock value="68.2" unit="kg" label="Lean Mass" size="sm" color="emerald" />
              <StatBlock value="1,848" unit="kcal" label="BMR" size="sm" color="gold" />
              <StatBlock value="2,587" unit="kcal" label="TDEE" size="sm" color="blue" />
              <StatBlock value="+260" unit="kcal" label="Surplus" size="sm" color="emerald" />
              <StatBlock value="28" unit="days" label="Protocol" size="sm" />
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell level="surface" showDivider>
        <SectionHeader
          eyebrow="06 — Charts & Graphs"
          title="Atmospheric visualization"
          subtitle="The chart container now uses the same material system as the cards, while the Nivo theme inherits the final KhromaDiet tokens."
        />

        <ChartContainer
          title="7-Day Caloric Projection"
          subtitle="Actual intake with area falloff against a neutral threshold line"
          legend={[
            { label: 'Actual', tone: 'emerald', style: 'solid' },
            { label: 'Target', tone: 'muted', style: 'dashed' },
          ]}
          height={360}
          glow="emerald"
        >
          <ResponsiveLine<PreviewSeries>
            data={previewSeries}
            theme={NIVO_THEME}
            margin={{ top: 24, right: 36, bottom: 48, left: 56 }}
            defs={[
              {
                id: 'previewAreaGradient',
                type: 'linearGradient',
                colors: [
                  { offset: 0, color: 'var(--emerald-500)', opacity: 0.25 },
                  { offset: 70, color: 'var(--emerald-500)', opacity: 0.05 },
                  { offset: 100, color: 'var(--emerald-500)', opacity: 0 },
                ],
              },
              {
                id: 'previewLineGradient',
                type: 'linearGradient',
                colors: [
                  { offset: 0, color: 'var(--emerald-600)', opacity: 1 },
                  { offset: 50, color: 'var(--emerald-500)', opacity: 1 },
                  { offset: 100, color: 'var(--emerald-400)', opacity: 1 },
                ],
              },
            ]}
            fill={[{ match: '*', id: 'previewAreaGradient' }]}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 2250, max: 2550, stacked: false, reverse: false }}
            curve="monotoneX"
            colors={() => 'url(#previewLineGradient)'}
            lineWidth={2.5}
            pointSize={8}
            pointColor="var(--bg-base)"
            pointBorderWidth={2}
            pointBorderColor="var(--text-primary)"
            enableArea
            areaOpacity={1}
            enableGridX={false}
            useMesh
            enableSlices={false}
            markers={[
              {
                axis: 'y',
                value: 2400,
                lineStyle: {
                  stroke: 'var(--text-ghost)',
                  strokeWidth: 1,
                  strokeDasharray: '6 4',
                },
                legend: 'Target',
                legendPosition: 'right',
                textStyle: {
                  fill: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                },
              },
            ]}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 0,
              tickPadding: 12,
              legend: 'Last 7 days',
              legendOffset: 38,
              legendPosition: 'middle',
            }}
            axisLeft={{
              tickSize: 0,
              tickPadding: 12,
              legend: 'Calories',
              legendOffset: -42,
              legendPosition: 'middle',
            }}
          />
        </ChartContainer>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <DataCard>
            <div className={subsectionLabelClassName}>Primitives snapshot</div>
            <div className="mt-6 flex flex-col gap-5">
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge>Emerald signal</Badge>
                <Badge variant="secondary">Gold signal</Badge>
                <Badge variant="outline">Neutral label</Badge>
              </div>

              <Input
                value="Caloric threshold / protocol label"
                readOnly
                aria-label="Preview input"
              />
            </div>
          </DataCard>

          <DataCard glow="gold">
            <div className={subsectionLabelClassName}>Supporting note</div>
            <div className="mt-6 space-y-4 text-sm leading-[1.7] text-[var(--text-secondary)]">
              <div className="inline-flex items-center gap-2 text-[var(--text-primary)]">
                <Info className="h-4 w-4 text-[var(--gold-400)]" />
                The primitives remain untouched in this prompt.
              </div>
              <p>
                They are only shown here because their current theme already sits close enough to
                the updated component language.
              </p>
            </div>
          </DataCard>
        </div>
      </SectionShell>
    </div>
  );
};

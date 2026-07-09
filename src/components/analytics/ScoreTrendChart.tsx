'use client'

import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
} from 'recharts'

export interface ScorePoint {
  date: string
  score: number
}

interface ScoreTrendChartProps {
  points: ScorePoint[]
  maxScore: number
  passScore: number
}

function CustomDot({ cx, cy, payload, passScore }: { cx?: number; cy?: number; payload?: ScorePoint; passScore: number }) {
  if (cx === undefined || cy === undefined || !payload) return null
  const color = payload.score >= passScore ? '#43A047' : '#E53935'
  return <circle cx={cx} cy={cy} r={4} fill={color} stroke="#fff" strokeWidth={2} />
}

function LastPointBadge({
  x,
  y,
  index,
  total,
  value,
}: {
  x?: number | string
  y?: number | string
  index?: number
  total: number
  value?: number | string | null
}) {
  if (x === undefined || y === undefined || index !== total - 1) return null
  const nx = Number(x)
  const ny = Number(y)
  return (
    <g>
      <rect x={nx - 20} y={ny - 26} width={40} height={18} rx={5} fill="#43A047" />
      <text
        x={nx}
        y={ny - 13}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fill="#fff"
        fontFamily="'JetBrains Mono', monospace"
      >
        {value}
      </text>
    </g>
  )
}

export function ScoreTrendChart({ points, maxScore, passScore }: ScoreTrendChartProps) {
  const lastScore = points[points.length - 1]?.score ?? 0

  return (
    <div className="h-[150px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={points} margin={{ top: 12, right: 42, bottom: 4, left: 0 }}>
          <YAxis
            domain={[0, maxScore]}
            ticks={[0, 60, maxScore]}
            axisLine={false}
            tickLine={false}
            width={30}
            tick={{ fontSize: 9, fill: '#B0BEC5', fontFamily: "'JetBrains Mono', monospace" }}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 9, fill: '#90A4AE', fontFamily: "'JetBrains Mono', monospace" }}
          />
          <ReferenceLine
            y={passScore}
            stroke="#FB8C00"
            strokeWidth={1.5}
            strokeDasharray="5 4"
            label={{ value: `Lulus ${passScore}`, position: 'right', fontSize: 9, fontWeight: 700, fill: '#E65100' }}
          />
          <Area type="monotone" dataKey="score" stroke="none" fill="rgba(21,101,192,0.08)" />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#1565C0"
            strokeWidth={2.5}
            dot={(props) => <CustomDot {...props} passScore={passScore} key={props.payload?.date ?? props.cx} />}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="none"
            dot={false}
            isAnimationActive={false}
            /* eslint-disable @typescript-eslint/no-explicit-any -- recharts' label render-prop type is a wide union not worth narrowing */
            label={((props: any) => (
              <LastPointBadge {...props} total={points.length} key={`badge-${props.index}`} />
            )) as any}
            /* eslint-enable @typescript-eslint/no-explicit-any */
          />
        </ComposedChart>
      </ResponsiveContainer>
      <span className="sr-only">Skor terbaru {lastScore}</span>
    </div>
  )
}

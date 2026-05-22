import { HUDLabel } from '@/components/ui/hud-label'
import { HazardDivider } from '@/components/ui/hazard-divider'

const fun = [
  {
    id: 'F-01',
    label: 'Windows 95',
    blurb:
      'A loving recreation of the classic Windows 95 desktop, with a modern twist. Coming soon.',
  },
  {
    id: 'F-02',
    label: 'Minecraft Redesign',
    blurb:
      'A reimagining of the Minecraft launcher and in-game UI. Coming soon.',
  },
]

export function FunPage() {
  return (
    <section className="relative w-full bg-background pt-32 pb-32">
      <div className="mx-auto max-w-[1600px] px-12">
        <div className="mb-12">
          <HUDLabel id="999">Side Quests</HUDLabel>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-7xl">
            Projects for fun
          </h1>
          <p className="mt-5 text-lg text-muted-foreground md:text-2xl">
            Concepts I built for myself — nostalgia revivals and visual
            experiments.
          </p>
        </div>

        <div className="mt-24">
          <HazardDivider label="VAULT // EXPERIMENTAL" className="mb-12" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            {fun.map((f) => (
              <div
                key={f.id}
                className="relative clip-cyber border border-dashed border-border bg-card/40 p-8 md:p-12"
              >
                <div className="font-hud text-[10px] uppercase tracking-[0.3em] text-[#CBEE4C]">
                  ▸ [{f.id}] ENCRYPTED
                </div>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                  {f.label}
                </h2>
                <p className="mt-3 text-base text-muted-foreground md:text-lg">
                  {f.blurb}
                </p>
                <div className="font-hud mt-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  ▸ STATUS: AWAITING UPLOAD
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

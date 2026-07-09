interface ProfileHeaderProps {
  name: string
  email: string
  avatarInitial: string
}

export function ProfileHeader({ name, email, avatarInitial }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#CFD8DC] text-xl font-bold text-[#455A64] shadow-[0_1px_3px_rgba(55,71,79,0.15)]">
        {avatarInitial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-base font-bold text-[#263238]">{name}</div>
        <div className="truncate text-xs text-[#90A4AE]">{email}</div>
      </div>
    </div>
  )
}

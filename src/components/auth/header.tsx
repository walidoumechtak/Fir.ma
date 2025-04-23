import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

interface HeaderProps {
  label: string
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-y-4'>
      <h1 className={cn('text-3xl inline font-semibold ', font.className)}>
        <span className="inline bg-gradient-to-r from-[#a5d7a7]  to-[#4caf50] text-transparent bg-clip-text">
            Fir.ma
        </span>{" "}
      </h1>
      <p className='text-sm text-muted-foreground'> {label}</p>

    </div>
  )
}

export default Header

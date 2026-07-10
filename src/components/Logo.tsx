import Image from 'next/image'

export function AfvLogo({
  className = 'h-10 w-auto',
  variant = 'light',
}: {
  className?: string
  variant?: 'dark' | 'light'
}) {
  return (
    <Image
      src="/logo.png"
      alt="AFV Beltrame Group — Steel Since 1896"
      width={200}
      height={200}
      className={className}
      style={{
        objectFit: 'contain',
        ...(variant === 'dark' ? { filter: 'brightness(0) invert(1)' } : {}),
      }}
      priority
    />
  )
}

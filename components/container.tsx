export function Container({ children, width }: {children: React.ReactNode, width: string}) {
  return (
    <div className={`${width} mx-auto`}>
      {children}
    </div>
  )
}

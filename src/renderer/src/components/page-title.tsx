import { cn } from "@renderer/lib/utils"

type PageTitleProps = {
  children: string
  className?: string
}

const PageTitle = ({ children, className }: PageTitleProps) => {
  return <h1 className={cn("text-2xl font-extrabold tracking-tight", className)}>{children}</h1>
}

export default PageTitle

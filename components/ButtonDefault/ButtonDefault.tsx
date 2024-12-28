import { Button } from "@/components/ui/button"

interface ButtonCreateProps {
  onClick: (event: React.MouseEvent) => void
  text: string
}

export const ButtonDefault= ({ onClick, text }: ButtonCreateProps) => {
  return (
    <Button 
      onClick={onClick}
      variant="default"
      size={"lg"}
      className="">
      {text}
    </Button>
  )
}

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { title } from "process";

const cards = [
  {
    description: "Total Revenue", title: "$1,250.00",
    actionBadge: { icon: <TrendingUpIcon />, text: "+12.5%" },
    footer: {
      line1: `Trending up this month ${<TrendingUpIcon className="size-4" />}`,
      line2: `Visitors for the last 6 months`
    }
  },

  {
    description: "New Customers", title: "1,234",
    actionBadge: { icon: <TrendingDownIcon />, text: "-20%" },
    footer: {
      line1: `Down 20% this period ${<TrendingDownIcon className="size-4" />}`,
      line2: `Acquisition needs attention`
    }
  },

  {
    description: "Active Accounts", title: "45,678",
    actionBadge: { icon: <TrendingUpIcon />, text: "+12.5%" },
    footer: {
      line1: `Strong user retention ${<TrendingUpIcon className="size-4" />}`,
      line2: `Engagement exceed targets`
    }
  },

  {
    description: "Growth Rate", title: "4.5%",
    actionBadge: { icon: <TrendingUpIcon />, text: "+4.5%" },
    footer: {
      line1: `Steady performance increase ${<TrendingUpIcon className="size-4" />}`,
      line2: `Meets growth projections`
    }
  },
]

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 
      *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="@container/card">
          <CardHeader>
            <CardDescription>{card.description}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{card.title}</CardTitle>
            <CardAction><Badge variant="outline">{card.actionBadge.icon} {card.actionBadge.text}</Badge></CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">{card.footer.line1}</div>
            <div className="text-muted-foreground">{card.footer.line2}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

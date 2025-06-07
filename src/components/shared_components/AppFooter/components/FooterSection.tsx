import Link from 'next/link';

type FooterLinkType = { href: string; name: string; }

export function FooterSection({ className, title, sectionDataList, ...props }: {
  title: string,
  sectionDataList: Array<FooterLinkType>
  className?: string,
}) {
  return (
    <div className={className} {...props}>
      <h4 className="mb-2 font-semibold">{title}</h4>
      {sectionDataList.map((link) => (
        <div key={link.name} className="text-sm">
          <Link href={link.href} className="hover:underline">{link.name}</Link>
        </div>
      ))}
    </div>
  )
}
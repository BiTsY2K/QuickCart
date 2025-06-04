import BrandLogo from "@/components/shared_components/BrandLogo/BrandLogo";

export function RegisteredOfficeAddress({
  className
}: { className?: string }) {
  return (
    <div className={`office_address ${className}`}>
      <BrandLogo className="mb-2 block" />
      <address className="text-sm font-medium !not-italic">
        <p className="addrLine_1">789 Gutenberg IT Park, Pine Road,</p>
        <p className="addrLine_2">Austin, TX, USA - 73301</p>
        <p className="telephone mt-2">
          Telephone: <span className="font-semibold">+84 1234 555 77</span>
        </p>
      </address>
    </div>
  )
}
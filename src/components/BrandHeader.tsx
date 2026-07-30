import { LogoMark } from "./LogoMark";

export function BrandHeader() {
  return (
    <div
      className="flex items-center gap-2 px-4 pb-1"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 14px)" }}
    >
      <LogoMark size={26} />
      <span className="font-brand text-[19px] leading-none tracking-tight">
        <span className="font-semibold text-ink">yousef</span>{" "}
        <span className="italic font-normal text-cal">foods</span>
      </span>
    </div>
  );
}

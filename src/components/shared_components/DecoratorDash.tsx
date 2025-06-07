import { FaStarOfLife } from "react-icons/fa6";

export interface HeadingProps {
  className?: string;
  fontClass?: string;
  description?: React.ReactNode;
  title?: React.ReactNode;
  hasNextPrev?: boolean;
  isCenter?: boolean;
  isSection?: boolean;
  children?: React.ReactNode;
  showDash?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  children, title = "", description = "",
  className = "mb-10", isCenter = false,
  isSection, hasNextPrev, showDash,
  ...args
}) => {
  return (
    <div className={`__section_heading__ relative mx-auto flex flex-col justify-between sm:flex-row sm:items-end ${className}`}>
      <div className={isCenter ? 'mx-auto mb-2 w-full text-center' : 'w-full'}>
        {title && (<p className="text-2xl font-medium uppercase text-primary">{title}</p>)}
        <h2 {...args} style={{ lineHeight: "1.2em" }}
          className={`mb-5 inline-flex items-center gap-2 font-medium ${isSection ? 'uppercase lineHeight text-3xl lg:text-5xl' : 'text-4xl'
            }`}
        >
          {children}{' '}
          {showDash && (
            <div className="hidden items-center md:flex">
              <div className="h-px w-48 bg-primary" />
              <FaStarOfLife className="text-4xl text-primary" />
            </div>
          )}
        </h2>
        {description && <p className="mt-5 text-neutral-500">{description}</p>}
      </div>
    </div>
  );
};

export default Heading; 
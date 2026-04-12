import { Button } from "@/components/ui/button";

const DonationButton: React.FC = () => {
  return (
    <Button
      type="button"
      className="inline-flex items-center gap-2 rounded-md bg-blue-950 px-2.5 py-2 text-white shadow-lg shadow-black/40 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:gap-3 sm:px-4 sm:py-6"
      onClick={() => {
        window.location.href = "https://shakthisat.org";
      }}
    >
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 sm:h-5 sm:w-5"
      >
        <path
          d="M7.077 6.476l-.988 3.569 5.65-3.589-3.695 13.54 3.752.004 5.457-20L7.077 6.476z"
          fill="currentColor"
        />
        <path
          d="M1.455 14.308L0 20h7.202L10.149 8.42l-8.694 5.887z"
          fill="currentColor"
        />
      </svg>

      <div className="flex flex-col">
        <span className="text-xs font-semibold sm:text-sm">Donate Now</span>
        <span className="hidden text-[11px] text-white/70 sm:block">Secured by Razorpay</span>
      </div>
    </Button>
  );
};

export default DonationButton;

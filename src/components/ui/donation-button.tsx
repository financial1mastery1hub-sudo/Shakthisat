import { Button } from "@/components/ui/button";

const DonationButton: React.FC = () => {
  return (
    <Button
      type="button"
      className="inline-flex items-center gap-3 rounded-md bg-blue-950 px-4 py-6 text-white shadow-lg shadow-black/40 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      onClick={() => {
        window.location.href = "https://shakthisat-global.vercel.app";
      }}
    >
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
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
        <span className="text-sm font-semibold">Donate Now</span>
        <span className="text-[11px] text-white/70">Secured by Razorpay</span>
      </div>
    </Button>
  );
};

export default DonationButton;

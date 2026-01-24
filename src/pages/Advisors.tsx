import advisors from "@/data/Advisors.json";

const Advisors = () => {
  return (
    <div className="flex flex-col items-center py-20 gap-10 text-white">
      {advisors.map((advisor, index) => (
        <div key={index} className="flex flex-col items-center">
          <img
            src={`/advisors/${advisor.image}`}
            alt={advisor.name}
            className="w-40 h-40 object-cover rounded-full"
          />
          <h2 className="text-xl mt-4">{advisor.name}</h2>
          <p className="text-sm opacity-80">{advisor.role}</p>
        </div>
      ))}
    </div>
  );
};

export default Advisors;

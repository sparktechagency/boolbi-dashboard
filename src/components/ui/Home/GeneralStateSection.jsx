import { FaUsers } from "react-icons/fa6";
import salongoLogo from "../../../assets/salon-go-logo.png";

const GeneralStateSection = ({ generalState }) => {
  const state = generalState;

  return (
    <div className="grid md:grid-cols-4 gap-3 md:h-[100px]">
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base">Total User</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.totalUser}
          </h3>
        </div>
      </div>
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base">New Revenue</h2>
          <h3 className="text-center text-2xl font-semibold">
            ${state?.totalRevenue}
          </h3>
        </div>
      </div>
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base">total job request</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.totalJobRequest}
          </h3>
        </div>
      </div>
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base">total job post</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.totalJobPost}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default GeneralStateSection;

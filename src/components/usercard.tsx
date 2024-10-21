import { IUser } from "../types/user-type";
export const UserCard: React.FC<IUser> = ({
  image,
  firstName,
  lastName,
  email,
  age,
  birthDate,
  address,
}) => {
  return (
    <div className="shadow-md bg-white rounded-xl w-full py-3 px-4">
      <div className="flex items-center gap-3 font-bold">
        <img src={image} className="w-12 h-12 rounded-full" />
        <p>{firstName}</p>
        <p>{lastName}</p>
      </div>
      <div className="text-gray-400 font-semibold text-sm">
        <p>{email}</p>
      </div>
      <div className="flex gap-6 pt-1">
        <div className="flex gap-2">
          <p>age:</p>
          <p className="text-blue-600  hover:text-purple-600">{age}</p>
        </div>
        <div className="flex gap-2">
          <p>birthday:</p>
          <p className="text-blue-600  hover:text-purple-600">{birthDate}</p>
        </div>
      </div>
      <div className="flex gap-1 pt-1 text-blue-600 hover:text-purple-600">
        <p> {address.address}</p>
        <p> {address.city}</p>
        <p> {address.country}</p>
        <p> {address.state}</p>
      </div>
    </div>
  );
};
export const UserCardSkeleton: React.FC = () => {
  return (
    <div className="shadow-md bg-white rounded-xl w-full py-3 px-4">
      <div className="flex items-center gap-3">
        <div className="bg-gray-300 w-12 h-12 rounded-full min-w-12"></div>
        <div className="bg-gray-300 w-20 h-4 rounded-md "></div>
        <div className="bg-gray-300 w-20 h-4 rounded-md "></div>
      </div>
      <div className="overflow-hidden space-y-2">
        <div className="bg-gray-300 w-24 h-4 rounded-md mt-2"></div>
        <div className="flex gap-2">
          <div className="bg-gray-300 w-20 h-3 rounded-md"></div>
          <div className="bg-gray-300 w-20 h-3 rounded-md"></div>
        </div>
        <div className="bg-gray-300 w-60 h-4 rounded-md"></div>
      </div>
    </div>
  );
};

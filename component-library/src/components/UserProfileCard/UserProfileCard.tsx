import type {UserProfileCardProps} from '../types';

 

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  user,
  showEmail = false, // Default to false if not provided
  showRole = true,   // Default to true if not provided
  onEdit,
  children
}) => {

  const { id, name, email, role, avatarUrl } = user;
  
  // Tailwind classes for a modern, responsive card design
  const cardClasses = "max-w-sm mx-auto my-8 p-6 bg-white shadow-xl rounded-xl transition duration-300 hover:shadow-2xl";
  const avatarClasses = "w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-500/50";
  const detailClasses = "text-gray-600 text-sm mb-1";
  const nameClasses = "text-3xl font-bold text-gray-900 mb-2 text-center";

  return (
    <div className={cardClasses}>
      {/* Avatar Image (with placeholder fallback) */}
      <img 
        src={avatarUrl || `https://placehold.co/96x96/6366F1/FFFFFF?text=${name[0]}`}
        alt={`${name}'s Avatar`} 
        className={avatarClasses}
        onError={(e) => {
            // Fallback if the URL fails, ensures the placeholder text shows
            e.currentTarget.src = `https://placehold.co/96x96/6366F1/FFFFFF?text=${name[0]}`;
        }}
      />

      {/* User Name */}
      <h1 className={nameClasses}>{name}</h1>

      {/* User ID */}
      <p className="text-center text-xs text-gray-400 mb-4">ID: {id}</p>

      {/* Conditional Details */}
      {showEmail && (
        <p className={detailClasses}>
          <span className="font-semibold">Email:</span> {email}
        </p>
      )}

      {showRole && (
        <p className={detailClasses}>
          <span className="font-semibold">Role:</span> {role}
        </p>
      )}
      
      {/* Optional Edit Button */}
      {onEdit && (
        <button
          onClick={() => onEdit(id)}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition duration-150 shadow-md"
        >
          Edit Profile
        </button>
      )}

      {/* Children elements (e.g., custom actions or badges) */}
      {children && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
}
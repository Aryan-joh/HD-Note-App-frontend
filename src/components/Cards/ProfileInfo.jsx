import React from 'react';
import { getInitials } from '../../utils/helper';

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <div className='flex items-center gap-3'>
      {/* Initials Circle */}
      <div className='w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-950 font-bold text-lg uppercase cursor-default'>
        {getInitials(userInfo?.fullName)}
      </div>

      {/* Name + Logout */}
      <div>
        <p className='text-sm font-semibold uppercase'>{userInfo?.fullName || "User"}</p>
        <button
          className='text-sm text-slate-700 underline cursor-pointer font-medium hover:text-red-500'
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;

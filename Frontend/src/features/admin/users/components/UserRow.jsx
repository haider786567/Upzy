import React from 'react';
import { Trash2, User, Mail, Shield } from 'lucide-react';

const UserRow = ({ user, onDelete }) => {
  return (
    <tr className="hover:bg-rose/5 transition-colors border-b border-rose/10">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 shrink-0 rounded-full bg-linear-to-br from-rose to-accent flex items-center justify-center text-cream">
            <User size={20} />
          </div>
          <div className="ml-4">
            <div className="text-sm font-bold text-dark">{user.username}</div>
            <div className="text-xs text-accent">ID: {user._id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm text-accent">
          <Mail size={14} className="mr-2" />
          {user.email}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
          user.role === 'admin' 
            ? 'bg-secondary/10 text-secondary border border-secondary/20' 
            : 'bg-accent/10 text-accent border border-accent/20'
        }`}>
          <Shield size={12} className="mr-1 mt-0.5" />
          {user.role || 'user'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this user?')) {
              onDelete(user._id);
            }
          }}
          className="text-rose hover:text-dark p-2 rounded-lg hover:bg-rose/10 transition-all"
          title="Delete User"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;

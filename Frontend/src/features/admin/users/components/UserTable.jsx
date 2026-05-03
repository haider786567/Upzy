import React from 'react';
import UserRow from './UserRow';
import { Users as UsersIcon } from 'lucide-react';

const UserTable = ({ users, loading, onDelete }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-rose border-t-secondary rounded-full animate-spin"></div>
        <p className="text-accent font-medium">Loading intelligence personnel...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-rose/30">
        <UsersIcon size={48} className="text-rose/40 mb-4" />
        <h3 className="text-xl font-bold text-dark">No users found</h3>
        <p className="text-accent">The personnel database is currently empty.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white/60 backdrop-blur-md rounded-3xl border border-rose/20 shadow-xl shadow-rose/5">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-rose/10">
          <thead className="bg-dark text-cream">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest">
                User
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest">
                Email
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest">
                Role
              </th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rose/10">
            {users.map((user) => (
              <UserRow key={user._id} user={user} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;

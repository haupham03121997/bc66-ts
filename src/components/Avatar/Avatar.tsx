import React from 'react';
import { CurrentUser } from "../../interfaces";

interface AvatarProps {
  user: CurrentUser
};

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div>Avatar
      {user.hoTen}
    </div>
  )
};

export default Avatar
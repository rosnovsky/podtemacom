import React from 'react';

export const Profile = ({ user }) => {
  return user !== null ?
    <>
      <p>Hi {user.name}!</p>
      <img src={user.picture} />
    </>: ""
};

export default Profile;

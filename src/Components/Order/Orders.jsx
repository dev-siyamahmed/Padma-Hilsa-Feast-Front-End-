import React from 'react'
import useCurrentUser from '../../Hooks/useCurrentUser';

export default function Orders() {
  const {currentUser} = useCurrentUser()
  console.log(currentUser);
  return (
    <div>
      Orders
    </div>
  )
}

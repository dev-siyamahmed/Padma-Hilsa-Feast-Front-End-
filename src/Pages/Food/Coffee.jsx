import React from 'react'
import useCurrentUser from '../../Hooks/useCurrentUser'

export default function Coffee() {
  const {currentUser} = useCurrentUser()
  console.log(currentUser);
  return (
    <div>
      Coffee
    </div>
  )
}

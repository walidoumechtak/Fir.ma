"use client"

import NewPasswordForm from "@/components/auth/new-password-form"

const NewPassword = () => {
    const pathParts = window.location.pathname.split('/')
    const uidb64 = pathParts[pathParts.length - 2]
    const token = pathParts[pathParts.length - 1]

  // Ensure that both uidb64 and token are present before rendering
  if (!uidb64 || !token) {
    return <p>Loading...</p>  // Show loading while parameters are being fetched
  }

  // We can safely pass uidb64 and token to the component after checking
  return (
    <NewPasswordForm uidb64={uidb64 as string} token={token as string} />
  )
}

export default NewPassword

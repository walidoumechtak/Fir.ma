"use client";

// import { BeatLoader } from 'react-spinners'
// import { useSearchParams } from "next/navigation";

import CardWrapper from "./card-wrapper";
import { useCallback, useEffect, useState } from "react";
//import { newVerification } from '@/actions/new-verification';
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

const NewVerificationForm = () => {
  // const [error, setError] = useState<string | undefined>();
  // const [success, setSuccess] = useState<string | undefined>();

  // // const searchParams = useSearchParams();
  // // const token = searchParams.get("token");

  // const onSubmit = useCallback(() => {
  //   // const token = searchParams.get("token");
  //   // if (!token) {
  //   //   setError("Missing token");
  //   //   return;
  //   // }
  //   // newVerification(token)
  //   //   .then((data) => {
  //   //     setSuccess(data.success);
  //   //     setError(data.error);
  //   //   })
  //   //   .catch(() => {
  //   //     setError("Something went wrong!");
  //   //   });
  // }
  // //   if (success || error) return;

  // //   if (!token) {
  // //     setError("Missing token");
  // //     return;
  // //   }
  // //   setSuccess("Verification successful!");
  // //   /*
  // //       newVerification(token)
  // //         .then((data) => {
  // //           setSuccess(data.success)
  // //           setError(data.error)
  // //         }).catch(() => {
  // //           setError("Something went wrong!")
  // //         })
  // //       */
  // // }, [token, success, error]);

  // useEffect(() => {
  //   onSubmit();
  // }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <div className="flex items-center w-full justify-center">
        {/* {!success && !error && (
          // <BeatLoader />
          <></>
        )}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />} */}
      </div>
    </CardWrapper>
  );
};
export default NewVerificationForm;

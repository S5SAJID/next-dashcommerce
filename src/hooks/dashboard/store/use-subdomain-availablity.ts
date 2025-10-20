"use client";
import { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { checkDashboardSubdomainAvailability } from '@/db/actions/dashboard/common/actions'; // Assuming this path is correct
import { useDebounceValue } from '@/hooks/use-debounce-value'; // Assuming this path is correct
import { z } from 'zod';
import { storeFormSchema } from '@/components/organisms/forms/auth/create-store/schema';

export function useSubdomainAvailabilityCheck(
  form: UseFormReturn<z.infer<typeof storeFormSchema>>,
  watchSubdomainValue: string,
  debounceTime: number = 500
) {
  const [debouncedSubdomain] = useDebounceValue(watchSubdomainValue, debounceTime);
  const [isSubDomainChecking, setIsSubDomainChecking] = useState(false);
  const [isSubDomainAvailable, setIsSubDomainAvailable] = useState(false);
  const subdomainError = form.formState.errors.subdomain?.message;

  useEffect(() => {
    if (
      form.getFieldState('subdomain').invalid &&
      subdomainError !== `The subdomain "${debouncedSubdomain}" is already taken.`
    ) {
      setIsSubDomainChecking(false);
      setIsSubDomainAvailable(false);
      return;
    }

    // 2. Skip check if value is empty or too short (Zod validation will handle the error message).
    if (!debouncedSubdomain || debouncedSubdomain.length < 3) {
      setIsSubDomainChecking(false);
      setIsSubDomainAvailable(false);
      // Ensure manual error is cleared if the user deletes the input
      if (subdomainError) {
        form.clearErrors('subdomain');
      }
      return;
    }
    
    // We should only proceed if the value *passes* all Zod rules up to the async check.
    // Zod's .refine(async...) will be triggered on submit, but this hook provides the real-time feedback.

    const validate = async (subdomain: string) => {
      // Prevent race conditions and update UI state
      const currentCheckValue = subdomain;
      setIsSubDomainChecking(true);
      setIsSubDomainAvailable(false);
      
      // Clear manual error from previous check before starting the new one
      form.clearErrors("subdomain");

      try {
        const { isAvailable } = await checkDashboardSubdomainAvailability(subdomain);

        // Crucial Check: Only apply the result if the debounce value hasn't changed
        // while the async call was running. This prevents race conditions.
        if (currentCheckValue !== form.getValues('subdomain')) {
            return;
        }

        setIsSubDomainAvailable(isAvailable);

        if (!isAvailable) {
          // Subdomain is taken: Set a React Hook Form error
          form.setError("subdomain", {
            type: "manual", // Use 'manual' for server-side errors
            message: `The subdomain "${subdomain}" is already taken.`,
          });
        }
      } catch (error) {
         // Handle potential server/network errors gracefully
         console.error("Subdomain availability check failed:", error);
         setIsSubDomainAvailable(false);
         // Optionally set an error here if the check itself fails
      } finally {
        setIsSubDomainChecking(false);
      }
    }
    
    // Run the validation
    validate(debouncedSubdomain);

  }, [debouncedSubdomain, form, subdomainError]); // Include subdomainError to correctly handle error clearing

  return {
    isSubDomainChecking,
    isSubDomainAvailable,
  };
}
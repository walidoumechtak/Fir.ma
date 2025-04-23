import { VerifyAuthOnRefresh } from "@/hooks/verify-auth-on-refresh";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <VerifyAuthOnRefresh>
      <div className="bg-muted/50 flex-grow overflow-auto  sm:p-4">
        {children}
      </div>
    </VerifyAuthOnRefresh>
  );
};

export default ProtectedLayout;

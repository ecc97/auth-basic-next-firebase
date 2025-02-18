import React from "react";
import AuthGuard from "./profile/guard/AuthGuard";
import Layout from "@/components/ui/layouts/Layout";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <Layout>{children}</Layout>
        </AuthGuard>
    );
}
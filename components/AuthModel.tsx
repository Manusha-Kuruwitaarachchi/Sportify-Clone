"use client"

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Model from "./Model";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModel from "@/hooks/useAuthModel";
import { useEffect } from "react";

const AuthModel = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session }= useSessionContext();
    const { onClose,isOpen }= useAuthModel();

    useEffect(() =>{
        if(session){
            router.refresh();
            onClose();
        }

    },[session, router, onClose]);

    const onChange = (open: boolean) => {
        if(!open){
            onClose();
        }
    }
  return (
    <Model
    title="Welcome Back"
    description="Login to your account"
    isOpen={isOpen}
    onChange={onChange}>
        <Auth
        theme="dark"
        magicLink
        providers={["github"]}
        supabaseClient={supabaseClient}
        appearance={{
            theme: ThemeSupa,
            variables: {
                default: {
                    colors:{
                        brand: '#404040',
                        brandAccent: '#22c55e'
                    }
                }
            }
        }}/>
    Auth Model Children    
    </Model>
  )
};
export default AuthModel;
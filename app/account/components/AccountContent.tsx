"use client";

import Button from "@/components/Button";
import useSubscribeModel from "@/hooks/useSubscribeModel";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AccountContent = () => {

const router = useRouter();
const subscribeModel = useSubscribeModel();
const { isLoading, subscription, user } = useUser(); 

const [ loading, setLoading ] = useState(false);

useEffect(() => {
    if (!isLoading && !user){
        router.replace('/');
    } 
},[isLoading,user,router]);

const redirectToCustomerPortal = async () => {
    setLoading(true);
    try{
        const { url,error } = await postData({
            url:'api/webhooks/create-portal-link'
    });
    window.location.assign(url);
    }
    catch (error){
        if(error){
            toast.error((error as Error).message);
        }
    }
    setLoading(false);
}
  return (
    <div
    className="mb-7 px-6">
        {!subscription && (
            <div
            className="flex flex-col gap-y-4">
               <p>No Active Plan.</p> 
               <Button
               onClick={subscribeModel.onOpen}
               className="w-[300px]"></Button>
            </div>
        )}
        {subscription && (
            <div className="flex flex-col gap-y-4">
                <p>
                    Your currently on the <b>{subscription?.prices?.products?.name}</b> plan
                </p>

                <Button
                className="w-[300px]"
                disabled={loading || isLoading}
                onClick={redirectToCustomerPortal}>
                    Open Customer Portal
                </Button>
            </div>
        )}
    </div>
  )
};
export default AccountContent;
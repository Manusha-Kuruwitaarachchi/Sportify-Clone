"use client"

import AuthModel from "@/components/AuthModel";
import SubscribeModel from "@/components/SubscribeModel";
import UploadModel from "@/components/UploadModel";
import { ProductWithPrice } from "@/types";
import { useEffect, useState } from "react";

interface ModelProviderProps{
  products: ProductWithPrice[];
}

const ModelProvider: React.FC <ModelProviderProps> = ({
  products
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() =>{
        setIsMounted(true);
    },[]);

    if(!isMounted) {
        return null;
    }

  return (
    <>
    <AuthModel/>
    <UploadModel/>
    <SubscribeModel products={products}/>
    </>
  )
};
export default ModelProvider;
'use client'

import { useSearchParams } from "next/navigation";

import PostNotification from "@/app/ui/postcompra/postNotification";
import { PostCompraMessageType } from "@/app/lib/types";
import { useCartStore } from "@/app/lib/cart/useCartStore";
import useFromStore from "@/app/lib/cart/hooks/useFromStore";

export default function PostCompra() {
    const searchParams = useSearchParams();
    const status = searchParams.get("status");
	
	// console.log(searchParams);

    let postCompraStatus: PostCompraMessageType = {
        type: null,
    };

    if (status === "approved") {
		// Take the cart data and show it on PostNotification before clearing it?
        useFromStore(useCartStore, state => state.clearCart);
        postCompraStatus = {
            type: "approved",
        };
    }else if (status === "failure") {
        postCompraStatus = {
            type: "failure",
        };
    }

    return(
        <>  
            <PostNotification postCompraType={postCompraStatus}/>
        </>
    );
}
'use client'

import { useSearchParams } from "next/navigation";
import PostNotification from "../ui/postcompra/postNotification";
import { PostCompraMessageType } from "../lib/types";
import { useCartStore } from "../lib/cart/useCartStore";
import useFromStore from "../lib/cart/hooks/useFromStore";

export default function PostCompra() {
    const searchParams = useSearchParams();
    const status = searchParams.get("status");

    let postCompraStatus: PostCompraMessageType = {
        type: null,
    };

    if (status === "approved") {
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